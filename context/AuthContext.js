import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import auth from '../auth/auth';
/**
 * Splits the user's full name into first and last name
 *
 * @param {Object} account - the users account
 * @returns {Object} users first and last name as object properties
 */
function splitNames(account) {
  let firstName = '';
  let lastName = '';
  const { name } = account;
  const nameParts = name && name.split(' ');
  if (Array.isArray(nameParts)) {
    [firstName, lastName] = nameParts;
  }
  return {
    firstName,
    lastName,
  };
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountId, setAccountId] = useState(null);
  const [account, _setAccount] = useState({});
  useEffect(() => {
    setAccount(auth.getUserInfo());
  }, []);
  const setAccount = (newAccount) => {
    setAccountId(newAccount?._id ?? null);
    if (newAccount) {
      _setAccount({ ...newAccount, ...splitNames(newAccount) });
      auth.setUserInfo(newAccount, true);
    } else {
      auth.setUserInfo({}, true);

      _setAccount({});
    }
  };
  const logOut = () => {
    auth.clearAppStorage();
  };
  return (
    <AuthContext.Provider
      value={{
        accountId,
        account,
        logOut,
        setAccount,
        isAuthenticated: !!accountId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
