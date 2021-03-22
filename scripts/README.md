# SCRIPTS

This subproject contains some scripts to automate calculations and save data to github

## Pulse

`pulse.js` is used to spread randomly bike counts in all minutes in each hour. This is used to create a torque map

How to run:

```bash
node src/pulse.js
```

## SaveCsv

`saveCsv.js` is used to download the data of the last month and ready to be uploaded to github repository to have a backup copy

How to run:

```bash
node src/saveCsv.js
```
