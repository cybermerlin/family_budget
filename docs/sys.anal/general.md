# System analytics

## Business rules

1. for saving the data between devices (in cloud), an user should be authorized
2. for saving the data in an encrypted mode, the user should have SASL login\pass on a local device or SASL\SSO login\pass on the cloud server
3. for saving the data on cloud servers the user should turn off the offline mode
4. all users can preset couple of goals
5. second goal - is a nearest goal with a small value (I wanna buy boat)
6. primary goal - is a biggest goal with a big value (I wanna have 50E6 to have a free wage 200 per month with no work)
7. user should set costs per month for 2nd n 1st goals
8. 


## Business requirements

1. all internet activities should be happened through a provider with triple tries with the dynamic period
2. the system should have only one service HTTP requests manager and should send all requests through wrapping into "many to one" packet
3. any activities of user with a data should be logged
4. any logger activities should be happened only through debouncer and throttler
5. encryption a data processed with an asymmetrical functions
6. all activities with the API should be happened through a message broker
7. 
