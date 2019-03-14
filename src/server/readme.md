Development setup - Ubuntu 16.04
---------------------------------------------------------------------------
- Clone source from git
- Visual Studio Code is installed
- Install Python3
```
    sudo apt-get update
    sudo apt-get -y upgrade
    sudo apt-get install -y python3-pip

```
- Install CairoSVG
```
  sudo apt-get install libffi-dev
  193  sudo pip3 install cffi
  194  sudo pip3 install cairocffi
  195  sudo pip3 install CairoSVG
```
- Install ffmpeg
``` 
    sudo apt-get install ffmpeg 
```
- Install all dependencies
```
    sudo pip3 install -r requirements.txt
```
- Install extension ms-python.python for VS Code then restart VS Code.
- Select launcher 'API Server' configuration and press ^F5 to start or F5 to debug. The application will be run at URL http://localhost:8000

DB manipulation
---------------------------------------------------------------------------
(Reference: http://blog.eustace.io/buiding-rest-api-with-flask-orator.html)
or (PDF: https://media.readthedocs.org/pdf/orator/develop/orator.pdf)


```
- Glusterfs install && setup
* [install guide https://docs.gluster.org/en/v3/Quick-Start-Guide/Quickstart/], skip step 2
* [Setup gui https://docs.gluster.org/en/v3/Administrator%20Guide/Setting%20Up%20Volumes/]
- Redis setup
```
    sudo apt-get install redis-server
    sudo nano /etc/redis/redis.conf. 
        - Replace: supervised no => supervised systemd
        - Comment: bind 127.0.0.1 ::1
        - Disable protect mode: protected-mode no
    sudo systemctl reload redis.service
    start redis-server

```

- Docker network setup:
```
    1. List avaiable network for docker, find network of mysql container
        sudo docker network ls
    2. Join a container to mysql container
        sudo docker network connect <mysql's network> <source container's name>
```
- Nginx deployement
```
    1. Install Nginx
        apt-get install nginx

    2. Install gunicorn
        pip3 install gunicorn

    3. Config nginx (/etc/nginx/site-availables/default)
        server {
            listen 80;
            listen [::]:80;

            server_name _;

            location / {
                    # try_files $uri $uri/ =404;
                    include proxy_params;
                    proxy_pass http://127.0.0.1:8000;
            }

            location /socket.io {
                include proxy_params;
                proxy_http_version 1.1;
                proxy_buffering off;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
                proxy_pass http://127.0.0.1:8000/socket.io;
            }

        }

    4. Start gunicorn server
        gunicorn -k geventwebsocket.gunicorn.workers.GeventWebSocketWorker -w 1 -b 0.0.0.0:9001 app:app


    5. Run at boot
        Edit file tools/vms-api-server.service and copy to /etc/systemd/system/
        sudo systemctl start vms-api-server
        sudo systemctl enable vms-api-server
```
- Build source:
```
    python3 build.py build_ext
```

- Get license request key
```
    python3 request_license.py
```
API Reference (Version 1.0)
---------------------------------------------------------------------------  

### User  
[Login](#login)  
[Authenticate with ACCESS-TOKEN](#authenticate-with-access-token)  
[Create new user](#create-new-user)  
[Update user](#update-user)  
[Delete users](#delete-users)  
[Search users](#search-users)  
[Change password](#change-password)  
[Reset password](#reset-password)  
[Retrieve user groups for an user](#retrieve-user-groups-for-an-user)  
[Add an user to groups](#add-an-user-to-groups)  
[Remove an user from groups](#add-an-user-to-groups)  

### User group  
[Add user group](#add-user-group)  
[Update user group](#update-user-group)  
[Delete user groups](#delete-user-groups)  
[Search user groups](#search-user-groups)  
[Retrieve members of an user group](#retrieve-members-of-an-user-group)
[Add members to an user group](#add-members-to-an-user-group)  
[Remove members from an user group](#remove-members-from-an-user-group)  

### Camera  
[Import camera list](#import-camera-list)  
[Add a camera](#add-a-camera)  
[Update a camera](#update-a-camera)  
[Delete cameras](#delete-cameras)  
[Search for cameras](#search-for-cameras)  

### Personalization  
[Retrieve personalized camera layout](#retrieve-personalized-camera-layout)  
[Save personalized camera layout](#save-personalized-camera-layout)

**Note**  
All HTTP-POST are made with Content-Type = application/json in header of http request  

### Login  
POST: << HOST >>/api/1.0/user/login  

***Parameters:***   
```
{
  "user_name": user-name,
  "password": pwd
}
```

***Result:***  

- Return the below JSON if success. Redirect user to the page to change password if need_to_change_pwd = true
```
{
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQ3MTI2ZmE2LWQxMjAtNDljMy1iN2FkLThmMDQ1NzI2MDk2ZiIsInVzZXJfbmFtZSI6InN1cGVyYWRtaW4iLCJmaXJzdF9uYW1lIjoiU3VwZXIiLCJsYXN0X25hbWUiOiJBZG1pbmlzdHJhdG9yIn0.Bu7CWw9SdpYHjTxqo9JGNQxyxGCtVVQA5VBvaYb0uyQ",
        "email": null,
        "first_name": "Super",
        "id": "d7126fa6-d120-49c3-b7ad-8f045726096f",
        "last_name": "Administrator",
        "phone_number": null,
        "user_name": "superadmin",
        "need_to_change_pwd": true,
        "is_admin": true
    },
    "details": null,
    "success": true
}
```
- {success=false, data="LOGIN_FAILED", details=null}. Show message: "Login failed. Please try again!".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Authenticate with ACCESS-TOKEN
GET: << HOST >>/api/1.0/user/auth  

***Parameters:***   
Put access token into the Http Request Header with name ACCESS-TOKEN before sending the HTTP-GET

***Result:***  

- Return the below JSON if success
```
{
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQ3MTI2ZmE2LWQxMjAtNDljMy1iN2FkLThmMDQ1NzI2MDk2ZiIsInVzZXJfbmFtZSI6InN1cGVyYWRtaW4iLCJmaXJzdF9uYW1lIjoiU3VwZXIiLCJsYXN0X25hbWUiOiJBZG1pbmlzdHJhdG9yIn0.Bu7CWw9SdpYHjTxqo9JGNQxyxGCtVVQA5VBvaYb0uyQ",
        "email": null,
        "first_name": "Super",
        "id": "d7126fa6-d120-49c3-b7ad-8f045726096f",
        "last_name": "Administrator",
        "phone_number": null,
        "user_name": "superadmin",
        "need_to_change_pwd": true,
        "is_admin": true
    },
    "details": null,
    "success": true
}
```
- {success=false, data="AUTH_FAILED", details=null}. Redirect client to login page.
- {success=false, data="PASSWORD_CHANGED_REQUIRED", details=null}. Show message: "You need to change password before proceed." with OK button. Click OK, redirect user to change password page
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Create new user
POST: << HOST >>/api/1.0/user/add  

***Parameters:***   
```
{
  "user_name": "someone",
  "password": "secret",
  "first_name": "First",
  "last_name": "Last",
  "email": "someone@gmail.com",
  "phone_number": "09090909055",
  "is_admin": false
}
```

***Result:***  

- Return the below User object if success
```
{
    "data": {
        "email": "someone@gmail.com",
        "first_name": "First",
        "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9",
        "is_admin": false,
        "last_name": "Last",
        "need_to_change_pwd": true,
        "phone_number": "09090909055",
        "user_name": "someone"
    },
    "details": null,
    "success": true
}
```
- {success=false, data="USER_EXISTED", details=null}. Show message: "This username is already existed".
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have permission to add new user".
- {success=false, data="PASSWORD_CHANGED_REQUIRED", details=null}. Show message: "You need to change password before proceed." with OK button. Click OK, redirect user to change password page
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Update user
POST: << HOST >>/api/1.0/user/update  

***Parameters:***   
```
{
    "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9",
    "first_name": "First",
    "last_name": "Last",
    "email": "someone@gmail.com",
    "phone_number": "09090909055",
    "is_admin": false
}
```

***Result:***  

- Return the below User object if success
```
{
    "data": {
        "email": "someone@gmail.com",
        "first_name": "First",
        "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9",
        "is_admin": false,
        "last_name": "Last",
        "need_to_change_pwd": true,
        "phone_number": "09090909055",
        "user_name": "someone"
    },
    "details": null,
    "success": true
}
```
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have permission to update user".
- {success=false, data="PASSWORD_CHANGED_REQUIRED", details=null}. Show message: "You need to change password before proceed." with OK button. Click OK, redirect user to change password page
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Delete users
POST: << HOST >>/api/1.0/user/delete  

***Parameters:***   
```
{
    "user_ids": ["ad80fe46-1f57-4e69-9420-6778fb59d5f9","2d703125-1c41-45ad-a8f8-82fef2777179", ...]
}
```

***Result:***  

- {success=true, data="", details=null}. 
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="DELETE_YOURSELF", details=null}. Show message: "You can't delete yourself".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Search users   
POST: << HOST >>/api/1.0/user/search  

***Parameters:***   
```
{
    "keyword": "user name or first name or last name",
    "page": 1, // start from 1
    "page_size": 10 
}
```

***Result:***  

- {success=true, data=User object collection, details=null}. 
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Change password
POST: << HOST >>/api/1.0/user/pwd/change  

***Parameters:***   
```
{
    "old_password": "old-password",
    "new_password": "new-password"
}
```

***Result:***  

- Return the below User object if success
```
{
    "data": {
        "email": "someone@gmail.com",
        "first_name": "First",
        "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9",
        "is_admin": false,
        "last_name": "Last",
        "need_to_change_pwd": false,
        "phone_number": "09090909055",
        "user_name": "someone"
    },
    "details": null,
    "success": true
}
```
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="OLD_PASSWORD_INCORRECT", details=null}. Show message: "Old password is not correct.".
- {success=false, data="PASSWORD_NO_DIFFERENCE", details=null}. Show message: "Please select another secured password.".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Reset password
POST: << HOST >>/api/1.0/user/pwd/reset  

***Parameters:***   
```
{
    "user_id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9"
}
```

***Result:***  

- {success=true, data="", details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USER_NOT_EXISTED", details=null}. Show message: "User is not existed".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Retrieve user groups for an user
GET: << HOST >>/api/1.0/user/<< user-id >>/groups

***Result:***  

- {success=true, data=User group object collection, details=null}. 
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Add an user to groups
POST: << HOST >>/api/1.0/user/<< user-id >>/groups/add  

***Parameters:***   
```
{
    "user_group_ids": ["332c6f9a-0a13-4b52-8e25-9159d649783a", "91bc84df-886e-4bab-a812-fe65e5d32b5b",...]
}
```

***Result:***  

- {success=true, data="", details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USER_NOT_EXISTED", details=null}. Show message: "User is not existed".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Remove an user from groups
POST: << HOST >>/api/1.0/user/<< user-id >>/groups/remove  

***Parameters:***   
```
{
    "user_group_ids": ["332c6f9a-0a13-4b52-8e25-9159d649783a", "91bc84df-886e-4bab-a812-fe65e5d32b5b",...]
}
```

***Result:***  

- {success=true, data="", details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USER_NOT_EXISTED", details=null}. Show message: "User is not existed".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Add user group
POST: << HOST >>/api/1.0/group/add  

***Parameters:***   
```
{
    "name": "Group1"
}
```

***Result:***  

- Return the below UserGroup object if success
```
{
    "data": {
        "name": "Group1",
        "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9"
    },
    "details": null,
    "success": true
}
```
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USERGROUP_EXISTED", details=null}. Show message: "This user group is existed.".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

***Result:***  

- Return the below UserGroup object if success
```
{
    "data": {
        "name": "Group1",
        "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9"
    },
    "details": null,
    "success": true
}
```
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USERGROUP_EXISTED", details=null}. Show message: "This user group is existed.".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Update user group
POST: << HOST >>/api/1.0/group/update  

***Parameters:***   
```
{
    "name": "Group1",
    "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9"
}
```

***Result:***  

- Return the below UserGroup object if success
```
{
    "data": {
        "name": "Group1",
        "id": "ad80fe46-1f57-4e69-9420-6778fb59d5f9"
    },
    "details": null,
    "success": true
}
```
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USERGROUP_EXISTED", details=null}. Show message: "This user group is existed.".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Delete user groups
POST: << HOST >>/api/1.0/group/delete  

***Parameters:***   
```
{
    "user_group_ids": ["ad80fe46-1f57-4e69-9420-6778fb59d5f9","2d703125-1c41-45ad-a8f8-82fef2777179", ...]
}
```

***Result:***  

- {success=true, data="", details=null}. 
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Search user groups   
POST: << HOST >>/api/1.0/group/search  

***Parameters:***   
```
{
    "keyword": "group name",
    "page": 1, // start from 1
    "page_size": 10 
}
```

***Result:***  

- {success=true, data=User group object collection, details=null}. 
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Retrieve members of an user group
GET: << HOST >>/api/1.0/group/<< user-group-id >>/members

***Result:***  

- {success=true, data=User objects collection, details=null}. 
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Add members to an user group
POST: << HOST >>/api/1.0/group/<< user-group-id >>/members/add  

***Parameters:***   
```
{
    "user_ids": ["332c6f9a-0a13-4b52-8e25-9159d649783a", "91bc84df-886e-4bab-a812-fe65e5d32b5b",...]
}
```

***Result:***  

- {success=true, data="", details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USERGROUP_NOT_EXISTED", details=null}. Show message: "User group is not existed".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Remove members from an user group
POST: << HOST >>/api/1.0/group/<< user-group-id >>/members/remove  

***Parameters:***   
```
{
    "user_ids": ["332c6f9a-0a13-4b52-8e25-9159d649783a", "91bc84df-886e-4bab-a812-fe65e5d32b5b",...]
}
```

***Result:***  

- {success=true, data="", details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="USERGROUP_NOT_EXISTED", details=null}. Show message: "User group is not existed".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Import camera list
POST: << HOST >>/api/1.0/camera/import  

***File upload parameters:***   
```
    "camera-list": CSV file
```

Download [camera-list.csv](vms/templates/samples/camera-list.csv) file and input data 

***Result:***  

- {success=true, data=Camera Setting object collection, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Add a camera
POST: << HOST >>/api/1.0/camera/add

***Parameters:***   
```
{
    "ip_address": "192.168.1.100",
    "mac_address": "x3:38:1d:ds:33",
    "vendor": "Xaomi"    
    "login_password": "homa@12345",
    "login_username": "admin",
    "ms_audio_codec": "",
    "ms_bit_rate": 4096,
    "ms_fps": 20,
    "ms_res_height": 720,
    "ms_res_width": 1280,
    "rtsp_url": "rtsp://admin:abc12345@192.168.1.121:8111/streaming/channels/101",
    "video_codec": "H264",
    "name": "Test3",
    "port_http": 80,
    "port_rtsp": 554,
    "port_tcp": 8898,
    "recording_enabled": true,
    "recording_frame_rate": 0,
    "recording_pack_duration": 0,
    "ss_audio_codec": "",
    "ss_bit_rate": 0,
    "ss_fps": 0,
    "ss_res_height": 0,
    "ss_res_width": 0,
    "ss_rtsp_url": "",
    "ss_video_codec": "",
}
```

***Result:***  

- {success=true, data=Camera Setting object, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="EXISTED_NAME", details=null}. Show message: "Name is already exists.".
- {success=false, data="EXISTED_MAC_ADDRESS", details=null}. Show message: "MAC address is already exists".
- {success=false, data="EXISTED_IP_ADDRESS", details=null}. Show message: "IP address is already exists".
- {success=false, data="", details=null}. Show message: "".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Update a camera
POST: << HOST >>/api/1.0/camera/update

***Parameters:***   
```
{
    "id": "bc4f646b-9074-4c8f-8ef2-8463ab2df014",
    "ip_address": "192.168.1.100",
    "mac_address": "x3:38:1d:ds:33",
    "vendor": "Xaomi"    
    "login_password": "homa@12345",
    "login_username": "admin",
    "ms_audio_codec": "",
    "ms_bit_rate": 4096,
    "ms_fps": 20,
    "ms_res_height": 720,
    "ms_res_width": 1280,
    "rtsp_url": "rtsp://admin:abc12345@192.168.1.121:8111/streaming/channels/101",
    "video_codec": "H264",
    "name": "Test3",
    "port_http": 80,
    "port_rtsp": 554,
    "port_tcp": 8898,
    "recording_enabled": true,
    "recording_frame_rate": 0,
    "recording_pack_duration": 0,
    "ss_audio_codec": "",
    "ss_bit_rate": 0,
    "ss_fps": 0,
    "ss_res_height": 0,
    "ss_res_width": 0,
    "ss_rtsp_url": "",
    "ss_video_codec": "",
}
```

***Result:***  

- {success=true, data=Camera Setting object, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="EXISTED_NAME", details=null}. Show message: "Name is already exists.".
- {success=false, data="EXISTED_MAC_ADDRESS", details=null}. Show message: "MAC address is already exists".
- {success=false, data="EXISTED_IP_ADDRESS", details=null}. Show message: "IP address is already exists".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Delete cameras
POST: << HOST >>/api/1.0/camera/delete  

***Parameters:***   
```
{
    "camera_ids":["", "",...]
}
```

***Result:***  

- {success=true, data=Camera Setting object, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Search for cameras  
POST: << HOST >>/api/1.0/camera/search  

***Parameters:***   
```
{
    "keyword":"name or ip-address or mac-address",
    "page": 1, // start from 1
    "page_size": 10 
}
```

***Result:***  

- {success=true, data=Camera Setting object collection, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="UNAUTHORIZED", details=null}. Show message: "You don't have administration permission".
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Retrieve personalized camera layout  
GET: << HOST >>/api/1.0/personalization/camera-layout/get  

***Result:***  

- {success=true, data=null or camera layout JSON object, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."

### Save personalized camera layout  
POST: << HOST >>/api/1.0/personalization/camera-layout/save  

***Parameters:***   
```
{
    Any key, values
}
```

***Result:***  

- {success=true, data=null, details=null}.
- {success=false, data="AUTH_FAILED", details=debug message if any}. Show message "Your session is expired" with OK button. Click OK, redirect user to login page.
- {success=false, data="SYSTEM_ERROR", details=debug message}. Show a common message: "Server is error. Please contact system administrator for support."
