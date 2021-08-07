// import { Observable } from 'rxjs';
import fs from "fs";

const debug = require('debug')('hap-client:keytardummy');

// let keytarStore = {};
const KeytarDummy = {
    getPassword: function (service, account) {
        debug(`Keytar.get ${service}/${account}`);
        // let password = keytarStore[`${service}/${account}`];

        let path = `${service}-${account}.json`;
        path = path.replace(/:/g, "-");
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
        debug(`Keytar.set ${service}/${account} ${password}`);

        let path = `${service}-${account}.json`;
        path = path.replace(/:/g, "-");
        fs.writeFileSync(path, password);
        // keytarStore[`${service}/${account}`] = password;

        return Promise.resolve(password);
    }
};
export {
    KeytarDummy as default
}
