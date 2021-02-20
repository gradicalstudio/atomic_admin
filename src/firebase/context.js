import React, { useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import { compose } from "recompose";

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} {...firebase} />}
  </FirebaseContext.Consumer>
);

export const withAuthorization = (condition) => (Component) => {
  const WithAuthorization = () => {
    useEffect(() => {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) => {
          if (!condition(authUser)) {
            // this.props.history.push(ROUTES.SIGN_IN);
          }
        }
        // () => this.props.history.push(ROUTES.SIGN_IN)
      );
    });

    return (
      <FirebaseContext.Consumer>
        {({ firebase, currentUser }) =>
          condition(currentUser) ? (
            <Component
              {...this.props}
              firebase={firebase}
              currentUser={currentUser}
            />
          ) : null
        }
      </FirebaseContext.Consumer>
    );
  };

  return withFirebase(WithAuthorization);
};

export default FirebaseContext;
