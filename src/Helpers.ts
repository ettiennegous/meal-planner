import * as DBI from './db-interfaces';

class Helpers {
    private static AjaxRequest (url: string, callback: Function) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
          callback(xhr);
        }
        xhr.send();
      }

      public static FetchSheetData<T>(sheetNumber: number, callback: Function) {
        return new Promise<T[]>(
          (resolve, reject) => {
            let url = `https://spreadsheets.google.com/feeds/cells/1j-3xiofidLm0-pKzgA7sK4TDRYao-51G1c1n8VcXSAE/${sheetNumber}/public/full?alt=json`;
            this.AjaxRequest(url, (xhr: XMLHttpRequest) => {
              if (xhr.status === 200) {
                let GSheet: DBI.GoogleSheet = JSON.parse(xhr.responseText);      
                let Collection: T[] = [];
                let previousRow = "2";
                let hasRowData = false;
                let Item: T = {} as T;
                GSheet.feed.entry.forEach((entry, index) => {
        
                  if(entry.gs$cell.row !== "1") {
        
                    if((previousRow !== entry.gs$cell.row || (GSheet.feed.entry.length == index + 1)) && hasRowData) {
                      Collection.push(Item);
                      hasRowData = false;
                      Item = {} as T;
                    }
                    previousRow = entry.gs$cell.row;
                    Item = callback(entry, Item);
                    switch(entry.gs$cell.col) {
                      case "1": 
                        hasRowData = true;
                        break;
                    }
                  }
                });
                resolve(Collection);
              }
            });
          });
      }

}

export default Helpers