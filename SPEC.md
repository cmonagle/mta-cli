# Transit App Real Time test

Sent by Juan on Friday, 1 Nov

## Resources

This is the [real time website](http://subwaytime.mta.info/) of the MTA in New York. It allows you to get real time predictions for the Subway lines. You can navigate it by clicking on a route and then on a stop of the list that is offered. It will display the next 3 departures on each direction.

[This is the stops.txt file](https://drive.google.com/file/d/1rB3JQiWyAytWCizPhiKXUNohFrtf0RQF/view) of the MTA Subway’s last published static GTFS dataset. It contains the details of all the stops of all the routes of all the Subway lines. It's a CSV file that respects the [following specification](https://developers.google.com/transit/gtfs/reference/#stopstxt).

## Requirements

1) prompts you all the subway routes of the MTA that the website can provide real time for. No need for a UI, just print that on command line.
2) allows you to select a route
3) once you select a route, it prints all the stops of the route with:
   - The stop name
   - The stop ID
   - The GPS coordinates that correspond to that stop in the stops.txt file
   - The stop name of that route that is located the furthest from that stop (you can calculate the distance as the crow flies with the GPS coordinates)

    The output of the program should be something like:

     - node getRealTimeMTA.js
     - Please choose a line among the following ones: 1, 2, 3, 4, 5 …., B, D, …, J, Z, …, R, W, … SIR
     - (user selects the line writing on the terminal)
     - Stops of route <selected route>:
       - Jamaica - 179 St (F01): 40.712646, -73.783817 => Court Sq
       - 169 St (F02): 40.71047,-73.793604 => East Broadway
       - Parsons Blvd (F03): 40.707564,-73.803326 => Church Av
       - and so forth…

(don’t use the values in this example to validate your code, this is just an example of potential output)

## Hints

- Only use the website and the stops.txt as external resources.
- For the routes, just the name has to be printed.
- You can use extra npm packages if you need to. Don’t try to reinvent the wheel.

## Follow Up Questions

A few followup questions for after the exercise:

- How much time did you spend on it?
- How much time do you think you should have spent on it?
- If there is any difference, why?
- Have you learned something during that project?
- How would you improve this test?