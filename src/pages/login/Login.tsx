import LoginFeature from "@features/Login/LoginFeature"
import Header from "../Bo/Header"

function Login() {
  return <>
  <Header/>
  <main className="wfx-main-dash m-0">
        <div className="wfx-main-dash__content p-0">
          <div className="wfx-main-dash__content-body">
            <div className="pg-login">
              <div className="h-full">
                <div className="pg-login__content p-5">
                  <div className="wfx-row align-items-center justify-content-center h-full">
                    <div className="col-lg-5 col-md-8 col-sm-12 col-12">
                      <div className="wfx-card">
                        <div className="wfx-card__content p-5">
                          <LoginFeature />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  </>
}

export default Login
