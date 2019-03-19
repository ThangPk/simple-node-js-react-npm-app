- Create a migration (developer use only)
```
    orator make:migration create_a_table --create --table table_name
    orator make:migration add_fields_to_table  --table table_name
```
- Create seed data (developer use only)
```
    orator make:seed users_table_seeder
```

- Refresh db with new db schema and seed data
``` 
    Only migration:             orator migrate
    Only seed:                  orator db:seed
    Refresh whole db:           orator migrate:refresh --seed
```

- MYSQL (8) network configuration:

```
    1. Add bind-address=0.0.0.0 to /etc/mysql/my.cnf
        [mysqld]
        bind-address=0.0.0.0
        max_connections=10000 
    2. Disable caching_sha2_password
        [mysqld]
        default_authentication_plugin=mysql_native_password
    3. Create uvms@% user 
        CREATE USER 'uvms'@'%' IDENTIFIED BY 'homa@12345';
        GRANT ALL PRIVILEGES ON *.* TO 'uvms'@'%';
        FLUSH PRIVILEGES;
    4. Create database
        CREATE DATABASE vms;
    5. Fix error of "Too many opened files":
        UnComment 2 below lines in /etc/systemd/system.conf
        
        DefaultLimitNOFILE=infinity
        DefaultLimitMEMLOCK=infinity

        Then run 'sudo systemctl daemon-reload'
