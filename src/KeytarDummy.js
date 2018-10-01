// import { Observable } from 'rxjs';
import fs from "fs";

// let keytarStore = {};
const KeytarDummy = {
    getPassword: function (service, account) {
        console.log(`Keytar.get ${service}/${account}`);
        // let password = keytarStore[`${service}/${account}`];

        let path = `${service}-${account}.json`;
        if (fs.existsSync(path)) {
            return Promise.resolve(fs.readFileSync(path, "UTF8"));
        }
        // if (!password) {
        //     if (account === "clientInfo") {
        //         password = {}
        //     } else {
        //         password = ''
        //     }
        // };
        return Promise.resolve(undefined);
    },
    setPassword: function (service, account, password) {
        console.log(`Keytar.set ${service}/${account} ${password}`);

        let path = `${service}-${account}.json`;
        fs.writeFileSync(path, password);
        // keytarStore[`${service}/${account}`] = password;

        return Promise.resolve(password);
    }
};
export {
    KeytarDummy as default
}