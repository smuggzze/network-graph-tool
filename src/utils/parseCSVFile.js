import Papa from "papaparse";

// Reads in a CSV file given the file object 'file'
// and returns a nested list representing the filled cells in
// the CSV file.
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