
export function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = function(event) {
            try {
                const jsonData = JSON.parse(event.target.result);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
  
        reader.onerror = function(error) {
            reject(error);
        };
  
        reader.readAsText(file);
    });
}