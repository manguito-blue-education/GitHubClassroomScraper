# GitHub Classroom Scrapper

Scrapper for obtaining users and status per activity

## How to use

### Obtain activity links
First obtain your link activities by executing the following inside the actual classroom page:

```javascript
copy([...document.getElementsByTagName("h3")].map(item => item.children[0].href));
```

This will put in your clipboard all the activity links

### Modifiy `main.sh`

Inside `main.sh` modify the activity links, by the new ones. Be careful with the syntaxis.

### Generate .env

Generate a `.env` file based on the `.demo.env`, and fill with your own credentials.

**This version only supports the auth method WITH 2FA (two factor authentication)**

### See the results

After executing `main.sh`, inside the `output` folder you may see the results of scraping your activities.


Made with 💙 from 🇲🇽
