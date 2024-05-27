import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getOrganisationId, getRole } from "@utils/getToken";
import { ROLE } from "@utils/ROLE";
import { COLUMNS } from "@utils/tableau";
import { search, searchNext } from "@features/Search/searchAPI";
import {
  extractPageFromUrl,
  userListSerializer,
} from "@utils/serialize";
import { deleteMembers } from "@config/API/getAPI";
import { popup } from "@utils/popupSwealert";
import { nextOrPrev } from "@pages/Bo/admin/gestionUser/GestionUserAPI";

interface InitialState {
  id?: number;
  showModaluser: boolean;
  nom: string;
  email: string;
  password: string;
  meetLink?: string;
  organizationName?: {
    id?: string | number;
    name?: string;
  };
  organizationListe?: { [key: string]: string }[];
  userList: { [key: string]: string }[];
  userToUpdated?: { [key: string]: string };
  updateAnUser: false | string;
  loadMore: boolean;
  page?: string;
  pagePrev?: string;
  current_page: number | false;

  // nouvelle etat selon les api
  loading: boolean;
  nextPage: string | null;
}

const initialState: InitialState = {
  showModaluser: false,
  email: "",
  password: "",
  nom: "",
  meetLink: "",
  organizationName: {},
  organizationListe: [],
  userList: [],
  updateAnUser: false,
  page: "",
  current_page: false,
  pagePrev: "",

  loading: false,
  loadMore: false,
  nextPage: null,
};

const gestionUserSlice = createSlice({
  name: "gestion-user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.showModaluser = true;
      state.email = "";
      state.nom = "";
      if (getRole() && getRole() !== ROLE.ADMIN_ORGANIZATION) {
        state.organizationName = {};
      }
      state.password = "";
      state.updateAnUser = false;
      state.userToUpdated = {};
    },
    hideUserModal: (state) => {
      state.showModaluser = false;
      state.updateAnUser = false;
      state.userToUpdated = {};
      state.password = "";
    },
    setForm: (state, action) => {
      const key = Object.keys(action.payload)[0];
      switch (key) {
        case "nom":
          state.nom = action.payload[key as keyof typeof initialState];
          break;
        case "email":
          state.email =
            action.payload[key as keyof typeof initialState].toLowerCase();
          break;
        case "password":
          state.password = action.payload[key as keyof typeof initialState];
          break;
        case "organizationName":
          state.organizationName =
            action.payload[key as keyof typeof initialState];
          break;
        case "meetLink":
          state.meetLink = action.payload[key as keyof typeof initialState];
          break;
      }
    },
    resetForm: (state) => {
      state.email = "";
      state.nom = "";
      if (getRole() && getRole() === ROLE.SUPER_ADMIN) {
        state.organizationName = {};
      }
      state.password = "";
      state.meetLink = "";
      state.updateAnUser = false;
    },
    setUserList: (state, action) => {
      if (
        getRole() &&
        getRole() === ROLE.ADMIN_ORGANIZATION &&
        action.payload.length > 0
      ) {
        state.organizationName = {
          id: getOrganisationId(),
          name: action.payload[0][COLUMNS.groupe] as string,
        };
      }

      state.userList = userListSerializer(action.payload);

      state.loadMore = false;
      state.nextPage = null;
      if (action.payload.next_page_url) {
        // initialiser le state de la liste
        state.page = extractPageFromUrl(action.payload.next_page_url) as string;
      }
      state.current_page = action.payload.current_page;
    },
    setNewUser: (state, action) => {
      state.userList = [
        {
          id: action.payload.id,
          email: action.payload.email,
          [COLUMNS.name]: action.payload.name,
          [COLUMNS.role]: action.payload.role
            ? action.payload.role == "technician"
              ? "technicien"
              : action.payload.role
            : "technicien",
          [COLUMNS.organisation]: action.payload.organization
            ? action.payload.organization
            : action.payload.groupe,
        },
        ...state.userList,
      ];
      state.organizationListe = state.organizationListe?.filter(value => {
        return value.name.toLowerCase() != action.payload.organization
      })
    },
    resetState: (state) => {
      state.email = "";
      state.nom = "";
      state.organizationName = {};
      state.password = "";
      state.userList = [];
      state.updateAnUser = false;
      state.userToUpdated = {};
    },
    updateUser: (state, action) => {
      state.showModaluser = true;
      state.id = action.payload.userInfo.id;
      state.updateAnUser = action.payload.type;
      state.email = action.payload.userInfo.email;
      state.nom = action.payload.userInfo[COLUMNS.name];
      if (getRole() && getRole() === ROLE.SUPER_ADMIN) {
        state.organizationName = state.organizationListe?.find(
          (org) => org.name === action.payload.userInfo.Groupe
        );
      }
      state.meetLink = action.payload.userInfo.meetLink;
    },
    updateUserInfo: (state, action) => {
      state.userList = state.userList.map((user) => {
        if (user.id === action.payload.id) {
          return {
            id: action.payload.id,
            email: action.payload.email,
            [COLUMNS.name]: action.payload.name,
            [COLUMNS.role]: user[COLUMNS.role],
            [COLUMNS.organisation]: action.payload.organization
              ? action.payload.organization.name
              : action.payload.groupe,
          };
        }
        return user;
      });
    },
    setOrganizationListe: (state, action) => {
      state.organizationListe = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // search
      .addCase(
        search.fulfilled,
        (state, action: PayloadAction<{ [key: string]: string | [] }>) => {
          const newRes = Array.isArray(action.payload.data)
            ? userListSerializer(action.payload.data)
            : state.userList;
          state.nextPage = extractPageFromUrl(
            action.payload.next_page_url as string
          );
          state.userList = [...newRes];
          state.loading = false;
        }
      )
      .addCase(search.rejected, (state) => {
        state.loading = false;
      })
      .addCase(search.pending, (state) => {
        state.loading = true;
        state.page = "";
        state.current_page = false;
        state.pagePrev = "";
      })
      // page suivant de la recherche
      .addCase(
        searchNext.fulfilled,
        (state, action: PayloadAction<{ [key: string]: string | [] }>) => {
          const newRes = Array.isArray(action.payload.data)
            ? userListSerializer(action.payload.data)
            : state.userList;
          state.nextPage = extractPageFromUrl(
            action.payload.next_page_url as string
          );
          state.userList = [...state.userList, ...newRes];
          state.loadMore = false;
        }
      )
      .addCase(searchNext.rejected, (state) => {
        state.loadMore = false;
      })
      .addCase(searchNext.pending, (state) => {
        state.loadMore = true;
        state.page = "";
        state.current_page = false;
        state.pagePrev = "";
      })
      // supprimer un utilisateur
      .addCase(deleteMembers.fulfilled, (state, action) => {
        popup("success", `L'utilisateur a été supprimé avec succès.`);
        state.userList = state.userList.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteMembers.rejected, () => {
        popup("error", `Erreur lors de la suppression de l'utilisateur.`);
      })
      // pagination liste user
      .addCase(nextOrPrev.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = Array.isArray(action.payload.data.data)
          ? userListSerializer(action.payload.data.data)
          : state.userList;
        state.pagePrev =
          action.payload.data.current_page === 1
            ? ""
            : `${action.payload.data.current_page - 1}`;
        if (action.payload.data.next_page_url) {
          // initialiser le state de la liste
          state.page = extractPageFromUrl(
            action.payload.data.next_page_url
          ) as string;
        } else {
          state.pagePrev = `${+(state.page as string) - 1}`;
          state.page = "";
        }
        state.current_page = action.payload.data.current_page;
      })
      .addCase(nextOrPrev.pending, (state) => {
        state.loading = true;
        state.loadMore = false;
        state.nextPage = null;
      });
  },
});

export const {
  setUser,
  hideUserModal,
  setForm,
  resetForm,
  setUserList,
  setNewUser,
  resetState,
  updateUser,
  updateUserInfo,
  setOrganizationListe,
} = gestionUserSlice.actions;

export default gestionUserSlice.reducer;
