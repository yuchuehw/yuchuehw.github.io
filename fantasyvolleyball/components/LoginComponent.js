export default {
  template: `
    <div class="alert alert-info mt-3 position-relative" role="alert">
      At present, our website is in its demo phase, and you're invited to be a part of the action! While login information is not mandatory, your participation can help us rigorously test and refine our system. As a token of appreciation, we're excited to offer you an exclusive achievement badge that will be yours to showcase once we officially launch!
    </div>
    

    <div v-if="sendSuccess" class="alert alert-info mt-3 position-relative" role="alert">
      <h4 class="alert-heading">Verification Email Sent! 📩</h4>
      <p>We've just sent a verification email to {{emailHold}}. Take a moment to check both your inbox and junk folder to ensure you receive it. Once you click on the verification link, you'll be all set to embark on an amazing journey with us!</p>
      <hr>
      <p class="mb-0">If you encounter any issues or have any questions, feel free to reach out to our friendly support team. Get ready to dive into the fantastic world of Fantasy Volleyball! 🏐✨</p>
    </div>
    
    <section class="vh-100" v-if="form1">
      <div class="container d-flex justify-content-center align-items-center h-100">
        <div class="card p-4 custom-card" style="background-color: #d1d1d1; color:#000000; border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Sign in</h3>

            <div class="form-outline mb-4">
              <label class="form-label" for="phoneNumberField">Phone Number</label>
              <div class="input-group">
                <span class="input-group-text">+1</span>
                <input type="tel" id="phoneNumberField" class="form-control form-control-lg custom-input" placeholder="(800) 555‑0100" v-on:keyup.enter="verify" v-model="tel" :class="{'is-invalid': showBadNumber}" @input="validatePhone" required />
                <div class="invalid-feedback">
                  Invalid phone number.
                </div>
              </div>
              <div id="telHelp" class="form-text">bracket, space, and dash are optional.</div>
            </div>
            

            <!-- Message -->
            <label class="form-check-label text-left">No sign-up required! Just enter your phone number, and we'll send you a verification code. It's simple, secure, and hassle-free! Message and data rates may apply. 🏐🎮</label>
            
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
            <label class="form-check-label">No sign-up needed! Simply provide your email address, and we'll send you a secure login link. No passwords to remember or hassle with. It's that easy!🏐🤩</label>
            
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

            <h3 class="mb-5">Check your text message</h3>

            <div class="form-outline mb-4">
              <label class="form-label" for="codeField">Verification Code</label>
              <input id="codeField" class="form-control form-control-lg custom-input"  placeholder="123456" maxlength="6" v-on:keyup.enter="phoneLog" v-model="code" required  :class="{'is-invalid': showBadCode}" @input="validateVerifCode" />
              <div class="invalid-feedback">
                Double check your code! it should be 6 digit!
              </div>
            </div>

            <!-- Message -->
            <label class="form-check-label"> Please check your phone for a confidential 6-digit code that we've sent you. This code is vital for securing your account, so please ensure not to share it with anyone else.</label>
            
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
    // if (this.isLoggedIn) {
    //   this.logout();
    // }
    // this.refocus();
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
      isGoodPhone:false,
      triedNumber:false,
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
    },
    showBadNumber() {
      return this.triedNumber && !this.isGoodPhone
    }
  },
  methods: {
    verify() {
      // temporary implementation
      if(this.tel == ""){
        this.form1 = false;
        this.form3 = true;
        return
      }
      this.triedNumber = true; 
      // actual implementation
      
      if(this.isGoodPhone){
        this.tel = "+1"+this.tel.replace(/\D/g, "")
      }else{
        return
      }
      
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
      if(this.code == ""){
        this.login()
        return  
      }
      
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
      if(this.email == ""){
        this.login()
        return  
      }
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
        this.triedCode = false
      }
      const pattern = /^[0-9]{6,6}$/;
      if(pattern.test(this.code)){
        this.isGoodCode = true;
      }else{
        this.isGoodCode = false;
      }
    },
    validatePhone(){
      if(this.code == ""){
        this.triedNumber = false
      }
      const testPhone = this.tel.replace(/\D/g, "");
      const pattern = /^[0-9]{10,10}$/;
      if(pattern.test(testPhone)){
        this.isGoodPhone = true;
      }else{
        this.isGoodPhone = false;
      }
    },
    refocus(){
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
