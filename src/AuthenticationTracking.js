export default class AuthenticationTracking {

    static myInstance = null;

    _isAuthenticated = false;

 
    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new AuthenticationTracking();
        }

        return this.myInstance;
    }

    getAuthStatus() {
        return this._isAuthenticated;
    }

    setAuthStatus(status) {
        this._isAuthenticated = status;
    }

}