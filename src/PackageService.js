import axios from 'axios'

const BASE_URL = 'https://node-app-generator.herokuapp.com/package';
//const BASE_URL = 'http://localhost:4000/package';
export default class PackageService {

    async getAdditionalPackages() {
        try {
            let response = await axios.get(`${BASE_URL}/additionalPackages`);
            if (response.status === 200) {
                return await response.data
            }
            else {
                return null
            }
        }
        catch (e) {
            return null

        }
    }

    async createPackage(packageName, additionalPackages) {
        try {
            let response = await axios.post(`${BASE_URL}/createPackage`, {
                packageName,
                additionalPackages
            })
            if (response.status === 200) {
                return response.data
            }
            else {
                return null
            }

        } catch (e) {
            return null;
        }
    }
}