# MTA subway stop listing CLI

## Running

To enter the prompt, run:

```bash
npm start
```

You will be presented with a list of lines from the MTA's real time subway API.
Enter a line and press enter. The list of stations serviced by that line will
be presented on the screen.

## Testing and linting

Be sure to `npm ci` first.

Run `npm test`. Tests are run in Mocha with Chai assertions. I didn't aim for
100% coverage, but added in tests where it made the most sense to me and would
help expose potential issues. Dependency injection is used to keep things testable.

`npm run lint` will run the style linting (semistandard) and type checking. JSDoc
is used extensively to get some semblence of type safety without requiring transpiling
for a one off test.

## Notes

Note that the `stops.txt` file is owned by the MTA and subject to the [following conditions](http://web.mta.info/developers/developer-data-terms.html)