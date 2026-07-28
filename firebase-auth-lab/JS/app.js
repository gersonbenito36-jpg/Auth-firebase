//Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import{
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut
  } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDesnt5FXzpfXdqVZcf_u4A28JWo9w-ZGw",
    authDomain: "lab-auth-firebase-21cd9.firebaseapp.com",
    projectId: "lab-auth-firebase-21cd9",
    storageBucket: "lab-auth-firebase-21cd9.firebasestorage.app",
    messagingSenderId: "136157882717",
    appId: "1:136157882717:web:428e7a3d0330ad32a220b4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  //Test
  console.log("firebase conectado correctamente");
  console.log(app);

  //PARA EL FORM
  const registerForm = document.getElementById("register-form")

  if(registerForm){
      registerForm.addEventListener("submit", async (event)=>{
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert("usuario registrado correctamente");
            console.log("usuario creado:", userCredential.user);
            window.location.href = "index.html";
        } catch (error){
            console.error("error al registrar usuario: ", error.message);
            alert("Error al registrar usuario: " + error.message);
        }
      } );
  }


  const loginForm = document.getElementById("login-form");
  if(loginForm)
    {
      
      loginForm.addEventListener("submit", async (event)=>{
        event.preventDefault();
        const emailIndex= document.getElementById("email-index").value;
        const passwordIndex = document.getElementById("password-index").value;
        try{
            const userCredential = 
            await signInWithEmailAndPassword(
                auth, 
                emailIndex, 
                passwordIndex
            );
            console.log("usuario autenticado: ", userCredential.user);
            alert ("Has iniciado sesión de manera exitosa");
            window.location.href = "dashboard.html";
        } catch (error){
            console.error(error);
            alert("Correo electrónico o conrtaseña no coinciden");
        }
      });
    }


    const userInformation = document.getElementById("user-information");
    if(userInformation) {
        onAuthStateChanged(auth, (user)=>{
            if(user){
                userInformation.textContent = "Bienvenido " + user.email;
            } else{
                window.location.href ="index.html";
            }
        });
    }

    const logout = document.getElementById("logout");
    if(logout){
            logout.addEventListener("click", async ()=>{
            try{
                await signOut(auth);
                alert("Desea cerrar sesión? click en aceptar");
                window.location.href = "index.html";
            } catch(error){
                console.error(error);
                alert("Error al tratar de cerrar sesión");
            }

        });
    }
    