import xarray as xr
import sys
import pandas as pd

def preprocessNCEP(ds):
  '''Pre-process the NCEP dataset to 
  - shift longitude from 0:360 to -180:180, and roll the dataset accordingly.
  Loading data from esrl is quite slow. Having the dataset available locally is much faster.'''
  ds = ds.assign_coords(lon=(((ds.lon + 180) % 360) - 180) ).roll( lon=len(ds.lon)//2, roll_coords=True)
  return ds

if __name__=="__main__":
  year = int(sys.argv[1])
  lat  = float(sys.argv[2])
  lon  = float(sys.argv[3])
  filename = ['http://www.esrl.noaa.gov/psd/thredds/dodsC/Datasets/ncep.reanalysis.dailyavgs/surface_gauss/air.2m.gauss.%i.nc'%year]
  with xr.open_mfdataset(filename, preprocess=preprocessNCEP, parallel=True ) as ds:
    air = ds.air.sel(lon=lon,lat=lat,method='nearest').load()
    print((air-273.15).to_pandas().to_json(orient='table'))
    sys.stdout.flush()
    
