import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import {Subject} from 'rxjs';

@Injectable()

export class TemplateService {    
    state = {};

    app = {
        name: 'Supplier portal',
        version: '1.0.0',
        // for chart colors
        color: {
            primary: '#3f51b5',
            info: '#2196f3',
            success: '#4caf50',
            warning: '#ffc107',
            danger: '#f44336',
            accent: '#7e57c2',
            white: '#ffffff',
            light: '#f1f2f3',
            dark: '#475069'
        },
        setting: {
            theme: { primary: 'brown-700', accent: 'light-blue', warn: 'blue' },
            asideFolded: true
        },
        search: {
            content: '',
            show: false
        }
    }
    public notification: Notification[] = [];
    public notifyCount: number = 0;
    public bNotify: boolean = false;
    offlineMode: boolean = false;
    document: string = '';
    bLoader: boolean = false;
    format: string = 'dd.MM.yyyy';
    formatMoment: string = 'DD.MM.YYYY';
    sqlFormat: string = 'YYYY-MM-DD';
    decPlaces:number;
    decPipeFormat:string;
    pricePipeFormat:string;
    companyName: string;
    navcollapse=false;
    setDecimalPlaces(){
        this.decPlaces = (typeof this.auth.getSession('setting')=='undefined' || this.auth.getSession('setting')==null || isNaN(this.auth.getSession('setting')))?2: Number(this.auth.getSession('setting')['decimalPlaces']);
        this.decPipeFormat=(typeof this.auth.getSession('setting')=='undefined' || this.auth.getSession('setting')==null || isNaN(this.auth.getSession('setting')))?'1.0-2':'1.0-'+Number(this.auth.getSession('setting')['decimalPlaces'])+'';
        this.pricePipeFormat=(typeof this.auth.getSession('setting') == 'undefined' || this.auth.getSession('setting') == null || isNaN(this.auth.getSession('setting')['decimalPrice']))?'1.2-2':'1.2-'+Number(this.auth.getSession('setting')['decimalPrice'])+'';
    }

    roundOff(value:number,precision:number=this.decPlaces){
        return parseFloat( value.toPrecision(precision));
    }

    roundDecimal(value:any,precision:any=this.decPlaces){
        return +(Math.round(Number(value + "e+"+precision))  + "e-"+precision);
    }

    toggleSearch(toggle) {
        this.app.search.show = toggle;
        this.app.search.content = '';
        console.log(this.app);
    }

    toggleOffline(val: boolean){
        this.app.setting.theme.primary = 'brown-700';
        if(val){
            this.app.setting.theme.primary = 'red';
        }
        this.offlineMode = val;
    }

    openPage() {
        this.app.search.content = '';
        this.app.search.show = false;
        this.closeAside();
    }

    openAside() {
        setTimeout(function () {
            //$mdSidenav('aside').open(); 
        });
    }

    orderNum(num: number, size: number, prefix: string) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return prefix + '-' + s;
    }

    closeAside() {
        setTimeout(function () {
            //document.getE('#aside').length && ('aside').close(); 
        });
    }

    isFloat(n): boolean {
        return (Number(n) === n && n % 1 !== 0) ? true : false;
    }

    // convert Json to CSV data in Angular2
    ConvertToCSV(objArray,columnsHeader:string[]=null) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";

        //If not columns headers are given
        if(columnsHeader==null)
        {
            for (var index in objArray[0]) {
                //Now convert each value to string and comma-separated
                row += "\"" + index + "\"" + ',';
            }
        }
        else{
            for (let i = 0; i < columnsHeader.length; i++) {
                //Now convert each value to string and comma-separated
                row += "\"" + columnsHeader[i] + "\"" + ',';
            }
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
                if(typeof( array[i][index])=='string'){
                    line +=  "\"" + array[i][index].replace(new RegExp("\"", "g"),"\"\"")  + "\"";
                }
                else{
                    line +=  "\"" + array[i][index] + "\"";
                }
            }
            str += line + '\r\n';
        }
        return str;
    }



    downloadCSV(data: any[], name: string = "ExportData", columns: any[] = null,columnsHeader:string[]=null){
        let listData = [];
        if(columns != null){
            data.forEach((v) => {
                var j = {}
                columns.filter(x => {
                    if(v[x] !== undefined){
                        if(v[x] == null){
                            j[x] = '';
                            return;
                        }
                        j[x] = v[x];
                    }
                });
                listData.push(j);
            });
        } else {
            listData = data;
        }
        console.log(listData);
        let csvData = this.ConvertToCSV(listData,columnsHeader);
        let a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        let blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        let url= window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name+'.csv';
        a.click();
    }

    setDTParams(param:any,conversion:(fParams:any)=>void){
        let filterParam:any={};
        filterParam.page=(param.first==0 || param.first==-1)?1:param.first/param.rows+1;
        filterParam.limit=param.rows;
        if(typeof param.sortField!='undefined'){
            filterParam.sort=param.sortField;            
            filterParam.order=param.sortOrder==1?'ASC':'DESC';
        }
        for(let i in this.tableOptions){
            if(this.tableOptions[i] != null && this.tableOptions[i] != ''){
                filterParam[i] = this.tableOptions[i];
            }
        }
        for(let i in this.tableOptionsPO){
            if(this.tableOptionsPO[i] != null && this.tableOptionsPO[i] != ''){
                filterParam[i] = this.tableOptionsPO[i];
            }
        }
        conversion(filterParam);
    }

    formatNumber(number:any,precision:number = 2) : number {
        return this.isFloat(number) ? number.toFixed(precision) : number;
    }

    formatFloat(number:any,precision:number = 2) : number {
        return parseFloat( this.isFloat(number) ? number.toFixed(precision) : number);
    }
    getTextHtml(text){
        if(text)
            return text.replace(new RegExp("\n", "g"),"<br />");
        return '';
    }

    uniqByKeepFirst(a, key) {
        let seen = new Set();
        return a.filter(item => {
            let k = key(item);
            return seen.has(k) ? false : seen.add(k);
        });
    }
    
    resetTableOptions(){
        this.tableOptions = {
            search: "",
            filter: 0,
        };

        this.tableOptionsPO = {
            woNumber: "",
            search: "",
            location: "",
            finishedDate: "",
        };
    }

    tableOptions: any= {};
    tableOptionsPO: any = {};

    checkAuth(route: string, perm: string){
        let aPermissions: any[] = this.auth.getSession('permissions');
        if(route != ''){
            return (typeof aPermissions[route] != 'undefined' && aPermissions[route].includes(perm));
        }
        return true;
    }

    // Remove element which are alerady present in the list
    removeContainingItems(items:any[],multiItem:any[],clickIndex:number,comparefield:string){
        items.forEach(function (element, i) {
            if (element[comparefield] != 0 && element[comparefield] != null && clickIndex != i) {
                multiItem.forEach(function (ele, index) {
                    if (element[comparefield] == ele.id) {
                        multiItem.splice(index, 1);
                    }
                })
            }
        });

        return multiItem;
    }
    
    constructor(public auth: AuthService) {
        this.state = this.app;
        this.companyName = this.auth.getSession('companyName');
        this.setDecimalPlaces();        
    }
}
