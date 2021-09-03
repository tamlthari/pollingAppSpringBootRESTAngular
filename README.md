## Building a Full Stack Polls app similar to twitter polls with Spring Boot, Spring Security, JWT, myBatis, Angular and Ant Design


### Introduction

I followed a complete tutorial series for this application on The CalliCoder Blog -

+ [Part 1: Bootstrapping the Project and creating the basic domain models and repositories](https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-1/)

+ [Part 2: Configuring Spring Security along with JWT authentication and Building Rest APIs for Login and SignUp](https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-2/)

+ [Part 3: Building Rest APIs for creating Polls, voting for a choice in a Poll, retrieving user profile etc](https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-3/)

+ [Part 4: Building the front-end using React and Ant Design](https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-4/)

## Reviews and guide to Setup the Spring Boot Back end app (polling-app-server)

Most devs can easily boot up the app running on React.
I found an implementation using Angular, which is much leaner, faster, and as pretty as React, in my experience.

Here in my root folder there is no React client, only Angular. So we will dive into setting up the Spring backend and the Angular frontend.
### But first, let's not forget setting up Database
1. The database I use is PostGreSQL, so feel free to change datasource configs (url, username, password) and hibernate dialect inside `src/main/resources/application.properties`
2. Next we can start importing project into IDE. After we've done that we can run application as "Spring Boot Application" and let JPA/myBatis instantiate and persist data as we configured inside our database
### Spring JPA + Security + JWT + myBatis
1. Import the server folder into Eclipse as a Maven existing project, based on the 'pom.xml', all the dependencies will be added automatically.
2. Choose `Run as Spring Boot App`
3. The application is running at `localhost:5000`
### Angular installation, build, deploy
1. Installing bootstrap and ngx-bootstrap: `yarn add bootstrap ngx-bootstrap`

  =  Import bootstrap css in src/styles.css:

  -  `@import '~bootstrap/dist/css/bootstrap.min.css';`

  =  Installing open iconic: `yarn add open-iconic`

  =  Import icon set in src/styles.css:

     `@import '~open-iconic/font/css/open-iconic-bootstrap.min.css';`

  =  Install ngx-toastr: `yarn add ngx-toastr`

  =  Import ngx-toastr css in src/style/css:

     `@import '~ngx-toastr/toastr.css';`

2. Configure proxy to talk to backend server:

create file `proxy.conf.json` in the app root directory
add the following code:
{ "/api": { "target": "http://localhost:5000", "secure": false } }

...where target url is the url for the backend server

3. update `angular.json` by adding `"proxyConfig": "./proxy.conf.json"` to the `serve.options`

4. `ng build`
5. Project will be deployed on 4200 proxied to 5000. So the project can be accessed by going to `http://localhost:5000`


Still got questions about Angular? Visit [this git](https://github.com/jannie-louwrens/spring-security-react-ant-design-polls-app/tree/polling-app-angular-client/polling-app-angular-client).

### Bonus: Swagger API documentation
1. On a separate browser or incognito window, go to `localhost:5000/swagger-ui.html`
2. For pure JSON go to `http://localhost:5000/v2/api-docs`
