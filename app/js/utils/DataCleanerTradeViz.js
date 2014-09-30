/**
 * Created by grahamclapham on 26/09/2014.
 */
DataCleanerTradeViz = function(data){

    var _cleanData = data;

    for(var i=0; i<_cleanData.DATES.length; i++){
        var __date = TradeVizD3.stringToDate(_cleanData.DATES[i]);
            _cleanData.DATES[i]= __date;
            _cleanData.VOLUME[i]= {volume:_cleanData.VOLUME[i], date:__date};
            _cleanData.TICKS[i]= {volume:_cleanData.TICKS[i], date:__date};
            _cleanData.PRICE[i]= {volume:_cleanData.PRICE[i], date:__date};
    }
    _cleanData.DATES = mergeSort(_cleanData.DATES)
    _cleanData.VOLUME = mergeSortObj(_cleanData.VOLUME, 'date')
    _cleanData.TICKS = mergeSortObj(_cleanData.TICKS, 'date')
    _cleanData.PRICE = mergeSortObj(_cleanData.PRICE, 'date')

    return _cleanData;
}