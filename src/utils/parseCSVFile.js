import Papa from "papaparse";

export function parseCSVFile(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file provided."));
            return;
        }

        Papa.parse(file, {
            complete: (result) => {
              resolve(result.data);
            },
            error: (error) => {
              reject(error);
            },
        });
    })
}