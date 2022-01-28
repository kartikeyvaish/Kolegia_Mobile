// packages Imports
import jwtDecode from "jwt-decode";

// function to verify a JWT Token
function decodeToken(token: string) {
    try {
        const payload = jwtDecode(token);

        return payload;
    } catch (error) {
        return null;
    }
}

// exports
export default {
    decodeToken
}
