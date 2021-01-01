# Workana Hiring challenge

Hi!

I'm Yohan Arias and this is the [Planning Poker](https://en.wikipedia.org/wiki/Planning_poker) System, a project in response to challenge from Workana.
The app is build using NodeJS, VueJS including their respectives Frameworks (AdonisJS and Quasar).
These frameworks let us keep a clean code using best practices.

## The Planning Poker Dashboard

[![See demo interface](https://user-images.githubusercontent.com/281727/100144788-13509980-2e76-11eb-8ae4-264f94928225.png)](https://codepen.io/emilioastarita/pen/NWRKWwv)

### At backend layer we have a NodeJS app:

- The app has a structure very similar to Laravel (MVC), in this case just Model - Controller.


### Backend endpoints implemented

The Rest API has the following endpoints:

##### `GET /issues` - Used to show issues. 
   - Show all of issues availables.

##### `POST /issue/{:issue}/join` - Used to join `{:issue}`. 
   - If issue not exists generate a new one.
   - Must receive a payload with the intended name. ie: `{"name": "florencia"}`
 
##### `POST /issue/{:issue}/vote` - Used to vote `{:issue}`. Must receive a payload with the vote value.
   - Reject votes when status of `{:issue}` is not `voting`. 
   - Reject votes if user not joined `{:issue}`. 
   - Reject votes if user already `voted` or `passed`. 
  
##### `GET /issue/{:issue}` - Returns the status of issue
   During `voting` status the votes are secret.
   - Issue is `voting`: 
        ````json
        {
         "status": "voting", 
         "members": [
              {"name": "florencia", "status": "voted"}, 
              {"name": "kut", "status": "waiting"}, 
              {"name": "lucho", "status": "passed"}
          ]
         }
        ````
   - Issue is `reveal` when all users emitted their votes: 
        ````json
            {
                "status": "reveal", 
                "members": [
                    {"name": "florencia", "status": "voted", "value": 20}, 
                    {"name": "kut", "status": "voted", "value": 20}, 
                    {"name": "lucho", "status": "passed"}
                ],
               "avg": 20
            }
       ````

#### Realtime 

The app updates the issues, voting and participants info in realtime.

#### Persistence

Redis is used to store the data.


### Frontend

The frontend is developed using Vue 2.

If you want to work on frontend use Vue 2 or Vue 3 to construct an interface:

 - Create or join an issue by number
 - Show board with cards for voting 
 - Show a list of members and the status of each one
 - Allow users to vote, pass or leave the issue
 - Bonus points if you handle client side routing (you can use libs)

If you prefer to work only on front side no problem! Just fake the data using a bunch of  async local functions and handle
a global state holding your data at the root component.

```javascript
async function getMembers() { 
   return [
       {"name": "florencia", "status": "voted", "value": 20}, 
       {"name": "kut", "status": "voted", "value": 20}, 
       {"name": "lucho", "status": "passed"}
   ];
}
```
 
We are interested to know how you work and if you are able to produce quality code, so take some time to think around 
details and put some effort to treat errors with robustness. 
Feel free to guide us to review your code and explain where you put more effort
or what you were thinking when you take the key design decisions.   

#### Some considerations:
 - The demo is in a single component, but it's better if you can use many, and demonstrate how would you communicate between them. "Divide and Conquer" :muscle:
 - Try to use good conventions and semantically correct names for variables & functions.
 - Take advantage of vue reactivity with computed properties and its two-way data-binding :twisted_rightwards_arrows:

## Get up and running

To run this code you need:
  - [Docker](https://www.docker.com/get-started) and [docker-compose](https://docs.docker.com/compose/install/) installed

Then:
  - Clone this repo: `git clone git@github.com:Workana/hiring_challenge.git`.
  - Run `docker-compose up`.
  
Check if services are up and running:
  - Node backend in [localhost:8082](http://localhost:8082/issue/234)
  - PHP backend in [localhost:8081](http://localhost:8081/issue/234)
  - Front dev server with demo in [localhost:8080](http://localhost:8080/)


## What we would like you to do?

Download this repo. Code it your way. Choose what parts of the system you want to implement and put your best effort doing it.

- Some unit testing is mandatory.
- Although we love other languages too, we prefer if you stick to PHP, Javascript or Typescript, as these are 
Workana main languages.



## Submission

 Please don't submit Pull Requests. After you're done, please email to [labs+hiring@workana.com](mailto:labs+hiring@workana.com) 
 with the link to your fork, so we can start talking =)

Thanks a lot and happy coding!

