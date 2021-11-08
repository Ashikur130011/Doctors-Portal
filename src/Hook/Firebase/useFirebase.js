import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
  updateProfile,
} from "firebase/auth";
import initializeFirebase from "../../Pages/Login/Firebase/firebase.init";

initializeFirebase();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('')
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState('')

  //from Password Authentication
  const registerUser = (email, password, name, history) => {
      setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setAuthError('')
        const newUser ={ email, displayName: name};
        setUser(newUser);
        // save user to database
        saveUser(email, name, 'POST')

        // send name to firebase After creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
          })
          .catch((error) => {
          });
          history.replace("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        // ..
      })
      .finally(()=> setIsLoading(false));
  };

  const logInUser = (email, password, history, location) => {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const destination = location?.state?.from || '/';
          history.replace(destination);
          // Signed in
          setAuthError('')
          // ...
        })
        .catch((error) => {
          
          setAuthError(error.message);
        })
        .finally(() => setIsLoading(false));
  }

  const signInUsingGoogle=(history, location)=> {
    setIsLoading(true);
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const user = result.user;
          saveUser(user.email, user.displayName, 'PUT');
          setAuthError("");
          const destination = location?.state?.from || "/";
          history.replace(destination);
          
        })
        .catch((error) => {
          // Handle Errors here.
          setAuthError(error.message);
          // ...
        })
        .finally(() => setIsLoading(false));

  }
  //observe user state from  ManageUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user)
          .then(idToken => {
            setToken(idToken);
          })
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);

  useEffect( () => {
    fetch(`http://localhost:5000/users/${user.email}`)
    .then(res => res.json())
    .then(data => setAdmin(data.admin))
  },[user.email])

  //from Password Authentication
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));;
  };
  //Save user to database
  /* const saveUser = (displayName, email, method) => {
      const user = { displayName, email }; */
  const saveUser = (email, displayName, method) => {
      const user = { email, displayName };
      fetch(`http://localhost:5000/users`, {
        method: method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json)
        .then((body) => {
          console.log(body);
        });
  }
  return {
    user,
    admin,
    token,
    registerUser,
    logOut,
    logInUser,
    isLoading,
    authError,
    signInUsingGoogle,
  };
}
export default useFirebase;