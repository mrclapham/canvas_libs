/**
 * Created by grahamclapham on 26/09/2014.
 */
DataCleanerTradeViz = function(data){

    var _cleanData

    for(var i=0; i<this._data.DATES.length; i++){
        var __date = TradeVizD3.stringToDate(this._data.DATES[i]);
        this._data.DATES[i]= __date
        this._data.VOLUME[i]= {volume:this._data.VOLUME[i], date:__date}
        this._data.TICKS[i]= {volume:this._data.VOLUME[i], date:__date}
        this._data.PRICE[i]= {volume:this._data.VOLUME[i], date:__date}


    }


}