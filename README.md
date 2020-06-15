# GitHub Classroom Scrapper

Scrapper for obtaining users and status per activity

## How to use

### 1. Obtain activity links
First obtain your link activities by executing the following inside the actual classroom page:

```javascript
copy([...document.getElementsByTagName("h3")].map(item => item.children[0].href));
```

This will put in your clipboard all the activity links

### 2. Modifiy `main.sh`

Inside `main.sh` modify the activity links, by the new ones. Be careful with the syntaxis.

### 3. Generate .env

Generate a `.env` file based on the `.demo.env`, and fill with your own credentials.

**This version only supports the auth method WITH 2FA (two factor authentication)**

### 4. See the results

After executing `main.sh`, inside the `output` folder you may see the results of scraping your activities.

### 5. Merge your results (Optional)

```sh
# Execute a container to create a merged csv
docker run --rm -p 8888:8888 -e JUPYTER_ENABLE_LAB=yes -e GRANT_SUDO=yes --user root -v "$PWD":/home/jovyan/work jupyter/scipy-notebook
```

Made with 💙 from 🇲🇽
