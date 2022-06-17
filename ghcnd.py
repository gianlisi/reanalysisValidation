import xarray as xr
import sys
import pandas as pd

if __name__=="__main__":
  year = int(sys.argv[1])
  lat  = float(sys.argv[2])
  lon  = float(sys.argv[3])

  #df = pd.read_fwf('ghcnd-stations.txt',widths=[11,9,10,7,3,30,5,10],names=['StationID','lat','lon','alt','state','longname','GSN','foo'])
  url = 'https://www.ncei.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt'
  df = pd.read_fwf(url,widths=[11,9,10,7,3,30,5,10],names=['StationID','lat','lon','alt','state','longname','GSN','foo'])
  dfgsn = df[df.GSN=='GSN']    # select only GSN stations

  idx = ((dfgsn.lat-lat)**2 + (dfgsn.lon-lon)**2).argmin()


  stationID = dfgsn.iloc[idx].StationID
  station = pd.read_csv('https://www.ncei.noaa.gov/data/global-historical-climatology-network-daily/access/%s.csv'%stationID,parse_dates=['DATE']).set_index('DATE')
  print( (station.TAVG.loc['%i-01-01'%year:'%i-12-31'%year]/10).to_json(orient='table') )
  sys.stdout.flush()
   


