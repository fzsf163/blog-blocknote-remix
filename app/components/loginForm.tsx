import "./loginForm.css";
import { Button } from "./ui/button";

export default function Login_Reg_Form() {
  return (
    <div>
      <div className="login-box">
        <div id="form-log">
          <div className="user-box">
            <input type="text" name="email" required />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <center>
            <Button id="link-send" type="submit">
              SEND
              <span></span>
            </Button>
          </center>
        </div>
      </div>
    </div>
  );
}
