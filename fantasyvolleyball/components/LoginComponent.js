export default {
  template: `
    <div class="alert alert-info mt-3 position-relative" role="alert">
      The website is currently only demoing. no email is required to login. click send to continue.
    </div>
    <div v-if="sendSuccess" class="alert alert-info mt-3 position-relative" role="alert">
      We have send a verification email to {{emailHold}}. Please check your email and junk folder!
      <button type="button" class="btn-close position-absolute end-0" @click="sendSuccess = false"></button>
    </div>
    <section class="vh-100" v-if="form1">
      <div class="container d-flex justify-content-center align-items-center h-100">
        <div class="card p-4 custom-card" style="background-color: #d1d1d1; color:#000000; border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Sign in</h3>

            <div class="form-outline mb-4">
              <label class="form-label" for="phoneNumberField">Phone Number</label>
              <div class="input-group">
                <span class="input-group-text">+</span>
                <input type="tel" id="phoneNumberField" class="form-control form-control-lg custom-input" placeholder="1 (800) 555‑0100" v-on:keyup.enter="verify" v-model="tel" required />
              </div>
              <div id="telHelp" class="form-text">bracket, space, and dash are optional.</div>
              <div id="validationServer03Feedback" class="invalid-feedback">
                Please provide a valid city.
              </div>
          
            </div>
            

            <!-- Message -->
            <label class="form-check-label"> We will send you a code to verify it is you! No sign up required! No passowrd to remember! Message and Data Rates May Apply.</label>
            
            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-start mb-4">
              <input class="form-check-input" type="checkbox" value="" id="rememberField" v-model="remember"/>
              <label class="form-check-label" for="rememberField"> Remember me </label>
            </div>

            <button class="btn btn-primary btn-lg btn-block custom-button" type="submit" @click="verify">Verify</button>
            <label>or</label>
            <button type="submit" class="btn btn-danger btn-lg btn-block custom-button" @click="form1=false;form2=true;refocus()">Sign in via Email Link</button>
            

            <hr class="my-4">

            <div id="recaptcha-container"></div>
            

          </div>
        </div>
      </div>
    </section>
    <section class="vh-100" v-if="form2">
      <div class="container d-flex justify-content-center align-items-center h-100">
        <div class="card p-4 custom-card" style="background-color: #d1d1d1; color:#000000; border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Sign in</h3>

            <div class="form-outline mb-4">
              <label class="form-label" for="emailField">Email</label>
              <input type="email" id="emailField" class="form-control form-control-lg custom-input" placeholder="email@example.com" v-on:keyup.enter="send" v-model="email" :class="{'is-invalid': showErrorMessage}" @input="validateEmail" required/>
              <div class="invalid-feedback">
                Invalid email format.
              </div>
            </div>

            <!-- Message -->
            <label class="form-check-label"> We will send you a login link to verify it is you! No sign up required! No passowrd to remember!</label>
            
            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-start mb-4">
              <input class="form-check-input" type="checkbox" value="" id="rememberField" v-model="remember"/>
              <label class="form-check-label" for="rememberField"> Remember me </label>
            </div>
            

            <button class="btn btn-primary btn-lg btn-block custom-button" type="submit" @click="send">Send</button>
            <label>or</label>
            <button type="submit" class="btn btn-danger btn-lg btn-block custom-button" @click="form1=true;form2=false;refocus()">Sign in via Text</button>
            

            <hr class="my-4">

            <div id="recaptcha-container"></div>
            

          </div>
        </div>
      </div>
    </section>
    <section class="vh-100" v-if="form3">
      <div class="container d-flex justify-content-center align-items-center h-100">
        <div class="card p-4 custom-card" style="background-color: #d1d1d1; color:#000000; border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Check your phone</h3>

            <div class="form-outline mb-4">
              <label class="form-label" for="codeField">Verification Code</label>
              <input id="codeField" class="form-control form-control-lg custom-input"  placeholder="123456" maxlength="6" v-on:keyup.enter="phoneLog" v-model="code" required  :class="{'is-invalid': showBadCode}" @input="validateVerifCode" />
              <div class="invalid-feedback">
                Double check your code! it should be 6 digit!
              </div>
            </div>

            <!-- Message -->
            <label class="form-check-label"> Check you phone for a 6 digit code we send you. Do not tell anyone this code.</label>
            
            <!-- Checkbox -->
            <div class="form-check d-flex justify-content-start mb-4">
              <input class="form-check-input" type="checkbox" value="" id="rememberField" v-model="remember" disabled/>
              <label class="form-check-label" for="rememberField"> Remember me </label>
            </div>

            <button class="btn btn-primary btn-lg btn-block custom-button" type="submit" @click="phoneLog">Login</button>
            <label>or</label>
            <button type="submit" class="btn btn-danger btn-lg btn-block custom-button" @click="form3=false;form2=true;refocus()">Sign in via Email Link</button>
            

            <hr class="my-4">

            <div id="recaptcha-container"></div>
            

          </div>
        </div>
      </div>
    </section>
  `,
  mounted() {
    if (this.isLoggedIn) {
      this.logout();
    }
    this.refocus();
  },
  data() {
    return {
      tel: '',
      email: '',
      emailHold: '',
      code: '',
      remember:false,
      form1: false,
      form2: true,
      form3: false,
      sendSuccess: false,
      isValidEmail:false,
      submitted:false,
      isGoodCode:false,
      triedCode:false,
      
    };
  },
  computed: {
    isLoggedIn() {
      return window.user != null;
    },
    showErrorMessage() {
      return this.submitted && !this.isValidEmail
    },
    showBadCode() {
      return this.triedCode && !this.isGoodCode
    }
  },
  methods: {
    verify() {
      // temporary implementation
      this.form1 = false;
      this.form3 = true;
      return
      // actual implementation
      this.tel = "+"+this.tel
      let promise = window.handlePhoneNumberAuth(this.tel)
      promise
        .then((confirm) => {
          this.confirm = confirm
          this.form1 = false;
          this.form3 = true;
        })
        .catch((error) => {
          //TODO:actually handling the error
          console.log(error);
        });

    },
    phoneLog(){
      // temporary implementation
      this.login()
      return
      // actual implementation
      this.triedCode = true
      if(!this.isGoodCode){
        return
      }
      let promise = window.handlePhoneNumberLog(this.confirm,this.code)
      promise
        .then((confirm) => {
          this.login()
          return
        })
        .catch((error) => {
          //TODO:actually handling the error
          console.log(error);
        });
    },
    login() {
      // Simulate login by adding user
      window.user = true      
      this.$router.push({path: "/roster", query: {success: true}});
    },
    send(){
      // temporary implementation
      this.login()
      return
      // actual implementation
      this.submitted = true
      if(!this.isValidEmail){
        return
      }
      localStorage.setItem('email', this.email);
      localStorage.setItem('remember', this.remember);
      let promise = window.handleEmailAuth(this.email) // TODO: HANDLE UNSUCCESSFUL promise
      this.emailHold = this.email 
      this.email = ''
      this.remember = false
      this.sendSuccess = true
      this.submitted = false
      // this.login()
    },
    logout() {
      // Simulate logout by removing user
      window.user = null;
      this.username = "";
      this.$router.push({path: "/", query: {success: true}});

    },
    validateEmail(){
      if(this.email == ""){
        this.submitted = false
      }
      const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if(pattern.test(this.email)){
        this.isValidEmail = true;
      }else{
        this.isValidEmail = false;
      }
    },
    validateVerifCode(){
      if(this.code == ""){
        this.submitted = false
      }
      const pattern = /^[0-9]{6,6}$/;
      if(pattern.test(this.code)){
        this.isGoodCode = true;
      }else{
        this.isGoodCode = false;
      }
    },refocus(){
      if(this.form1){
        document.getElementById("phoneNumberField").focus()
      }else if(this.form2){
        document.getElementById("emailField").focus()
      }else if(this.form3){
        document.getElementById("codeField").focus()
      }
    },
  },
};
