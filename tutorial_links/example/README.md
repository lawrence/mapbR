# Introduction.
To start off it's important to know what you want to visualize first in your map oriented data for Mapbox and mapBr to be useful.

Okay so let's visualize this: a crime complaints map where we want to find out what time of day has a certain number of crimes reported at what places in NYC. This will be useful in just glossing over a general crime 'noise' map for people who are traveling and can see:
- Oh we should avoid these places at this time range because there's a lot of noise here
- Looks like this is a really busy area with a lot of people filing complaints here
- Oh I wonder when crimes are reported the most? (cool realization after this was done was that for this example it seems that the NYC police report the crime more likely on minutes that end in 5 or 0 instead of the actual time)

# The Data.
In this example I have data of complaints in NYC from (I have a small snippet of this data in this directory): https://catalog.data.gov/dataset/nypd-complaint-data-historic

(For some reason all of the data wasn't downloaded when I had tried to download it but since this is an example, the whole dataset isn't much needed.)

Let's look at the data (column names w/ 1st row):
`- CMPLNT_NUM,CMPLNT_FR_DT,CMPLNT_FR_TM,CMPLNT_TO_DT,CMPLNT_TO_TM,RPT_DT,KY_CD,OFNS_DESC,PD_CD,PD_DESC,CRM_ATPT_CPTD_CD,LAW_CAT_CD,JURIS_DESC,BORO_NM,ADDR_PCT_CD,LOC_OF_OCCUR_DESC,PREM_TYP_DESC,PARKS_NM,HADEVELOPT,X_COORD_CD,Y_COORD_CD,Latitude,Longitude,Lat_Lon
- 101109527,12/31/2015,23:45:00,,,12/31/2015,113,FORGERY,729,"FORGERY,ETC.,UNCLASSIFIED-FELO",COMPLETED,FELONY,N.Y. POLICE DEPT,BRONX,44,INSIDE,BAR/NIGHT CLUB,,,1007314,241257,40.828848333,-73.916661142,"(40.828848333, -73.916661142)"`

We know that since we want the noise of a given location we can afford to drop a lot of these columns. Luckily this data is already in first normal form (if it wasn't look at here for a script example: ), so let's start stripping out our data to this:
`- CMPLNT_FR_TM,Latitude,Longitude
- 23:45:00,40.828848333,-73.916661142`
We only need these three columns because we're not too interested in the details of the crime, but the fact that it was reported 'at this location, at this time.'

Now let's use this script here to make this into a string and count up all the occurrences of that string. https://github.com/lawrence/independent_study/blob/master/scripts/occ.py

Neat! What that script just did was put every unique row into a list. For any row that wasn't unique aka repeated, the script would put the counter on that entry +1.

From here on out since we have our data properly formatted and ready to be used in our mapbR map, refer back to the mapbR documentation on http://mapbr.lare.me
