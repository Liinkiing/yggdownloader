# Yggdownloader

This is a Chrome extension that allows you to upload torrent links from YggTorrent to AllDebrid with just one click.

## Requirements
- A valid AllDebrid account with an API Key

## Installation

- Clone the repository.
- Copy the `.env` file and fill it with your credentials to a `.env.local`.
- Open Chrome and go to `chrome://extensions/`.
- Turn on the "Developer mode" toggle in the top right corner.
- Build the extension with `yarn run build`.
- Click on "Load unpacked" and select the folder where you have builded the extension. (`dist` folder)

## Usage

- Go to YggTorrent and navigate to the search page with the torrent link you want to upload.
- Click on the "AllDebrid" button that will appear next to the torrent link.
- The extension will automatically upload the torrent link to AllDebrid and copy the direct download link(s) to your clipboard if available.
- Paste the link in your download manager or browser to start the download.

## Motivations

I was previously using a self-made website to search and handle all of this, but 
recently YggTorrent has been using the new CloudFlare protection system and it's a 
pain to bypass, so I decided to make a Chrome extension to handle this and use it
directly from YggTorrent, so I could avoid CloudFlare protection.
