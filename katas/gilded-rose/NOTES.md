# Summary

As a quick summary of how to make the enhancements for this kata, the simplest overall strategy is:

1. Add missing specs / test before making any significant changes (i.e. try and get highest coverage possible)
2. Add a failing test for the new feature request
3. Update the existing code to meet the needed requirement
4. Re-factor elements of the code capture in the notes to improve the quality / maintainability of the code and test

# Process

During the work on the kata, I went through the following process / steps before modifying any code:

- Review requirements
- Document Initial observations
- Perform Systems / Design Thinking about the problem

The requirements document states that we can make any changes to the update quality method we like and add any new code as long as everything still works correctly, however, do not alter the Item class or Items property as those belong to the goblin in the corner.

For the sake of the coding exercise, I will abide by those rules, but in the `Systems / Design Thinking` section, I describe / review some of the things about the current solution that are sub-optimal and should probably be addressed in the near future.

# Review:

I like to paraphrase the problem statement / goals to ensure I understand it, taking from "https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/main/GildedRoseRequirements.txt", I see the following high level requirements

- The gist of the system is an inventory management system with products that change in quality as they approach their sell by date
- The rate of change depends on the type of product and it's relationship to it's sell-in (or sell-by value)
- The new feature request is to have an item that decay's in quality twice as fast as other items

# Initial Observations:

Before making any changes, these are some of my initial observations about the business problem, project structure, and code

## Business

- The type of problem being solved is similar to most inventory management systems that have rules around First-in-First-Out (FIFO) or Last-In-First-Out (LIFO) product valuation (https://www.businessnewsdaily.com/5514-fifo-lifo-differences.html).
  - Using common FIFO / LIFO rules is important to ensure that inventory is:
    - properly valued for accounting
    - time critical products are prioritized
    - when selling inventory, the correct inventory is sold

## Structure

- The original `GildedRose-Refactoring-Kata` repository is designed to house multiple language / project types for, I assume, the convenience of folks who want to perform the kata
- The package has a way to compile the code and run tests, but doesn't particularly define any way to figure out how the code should be used (probably because this is just a limited kata)

## Code

- The main chunk of code lives in `app/gilded-rose.ts` and is basically a large, complex, if-else structure that is executed when the `updateQuality` method is called.
- The class that performs the work is constructed with an array of inventory items, and each inventory item is a class with properties relevant to determining the type of quality update to apply to the inventory
- The inventory state is persisted in the classes memory and mutated when calls are made to update quality

## Testing

- There are two placeholders for tests (one for `jest` based tests and one for `mocha` based tests) in `test/gilded-rose.spec.ts`

# Systems / Design Thinking

Apply a little thinking about how a solution / design to solve the problem might work

## Business

- One of the first questions to ask about any coding task is, `Do I need to re-invent the wheel?`.
  - The intent of this project is a coding exercise, but in real life, it would probably we worthwhile to see if there are any javascript / typescript based inventory management packages that can be re-used instead of developing a system from scratch (or just software in general)
    - A quick search of github with keys like `+inventory +management +typescript` didn't bring up a lot of options but that was a very quick 5 minute scan so there might definitely be options available
    - There are also plenty of inventory management products on the market with custom definition rules for inventory

## Code

### State

- The class mutates an in memory array which isn't a great solution for any real application (i.e. scale / durability / atomicity)
  - Instead of mutating state, it might be better to return a copy of the inventory (i.e. immutable approach)
  - To handle future situations where there might be a large amount of inventory, only update a single piece of inventory at a time, maybe via:
    - [Stream Processing](https://en.wikipedia.org/wiki/Stream_processing)
    - [Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern)
- Even tho this is a Kata, it's probably not a bad idea to think about how the data would be persisted to a data store of some kind
  - The strategy could treat each piece of inventory as a record and use the [data mapper](https://www.martinfowler.com/eaaCatalog/dataMapper.html) or [active record](https://martinfowler.com/eaaCatalog/unitOfWork.html) patterns to manipulate and persist the inventory

### Business Logic

- The complicated if-else if-else style business logic in the `updateQuality` function is hard to reason about and maintain
  - A different way to approach that problem is to categorize the inventory (i.e. inventory type) and define custom rules to run for a given type of inventory. The rule / code execution could be driven many ways:
    - [Object oriented polymorphism](<https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>)
    - [Strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern)
    - The important point is to make the management of a large number of rules easy to reason about, easy to maintain, and test

### Data Model

- The code is doing string comparisons against static values (i.e. `this.items[i].name`) to help figure out which kind of updates to apply to a piece of inventory.
  - A pretty simple idea would be to seperate the attributes with a type of product from the instance of the product (i.e. `Inventory` versus `Product`)
  - Separating the product from the inventory also allows us to abstract product behaviors from inventory behaviors.

### Hygiene

- The current code is nicely encapsulated in a single file (i.e. `app/gilded-rose.ts`) but it is probably worth while to break out the concepts in that single file to multiple files.
  - A good reason to do that, is for no other reason, reducing merge conflicts if multiple people are working on the same file
  - Another good reason is to help a developer quickly identify the concept of the problem they are working on
- The code naming isn't very helpful in identifying what is going on.
  - Even if this is a small simple project, using names that help a developer separate code from different packages and locate the correct piece of functionality increases productivity dramatically.
    - `GildedRose` is the name of a business, not necessarily what the class in question is doing.
      - This class is basically iterating over an array of items that will update the quality of the inventory items being passed to it, but the responsibility is to update the quality of the inventory.
    - `Item` is a very generic name and doesn't indicate what kind of item is being worked with.
      - The intent is that the `item` is actually an instance of some inventory with given attributes

### Security

- The member variables in each class are `public` (and modifiable) by any consumer outside of the constructor / business logic
  - Replace with `protected` or `private` to prevent consumer mutation

### Syntax / Language Features

- Supposing we wanted to use mutation for the update logic, we could certainly shorten the code up by using mutation operators like `--`, `++`, `-=`, or `+=`
- Using an for loop with incrementing counter can be problematic
  - If we decide to do any kind of asynchronous work with this code in the future, assuming a static unchanging array reference might be unsafe
- Use of `==` or `!=` instead of `===` or `!==` can be problematic if the constant static values are replaced in the future with other variables with different types ([great stackoverflow question on this topic](https://stackoverflow.com/questions/359494/which-equals-operator-vs-should-be-used-in-javascript-comparisons))
- The constructor definition defaults the items array (which is odd). A simpler pattern might be something like `constructor(items) { this.items = items || [] }` (or using the modifier syntax with a default as defined below)
- Use the `constructor` modifier attributes to concisely define member variables (i.e. `constructor(protected items)) { ... }`) for less boilerplate
- `Array<Item>` isn't necessary, the short hand syntax can be used instead (i.e `Item[]`)
- Both class constructors have odd / missing argument type declarations
  - In the case of `GildedRose`, the constructor could just be `constructor(protected items: Item[] = []) { ... }`
  - In the case of `Item`, the constructor could just be `constructor(protected name: string, sellIn: number, quality: number) { ...}`
    - Without a type for the arguments, the system will assume type any

## Tests

- The test files are basically just place holders that fail when run
- The project allows the selection of either [JestJS](https://jestjs.io/) or [MochaJS](https://mochajs.org/)
  - Neither test framework is necessarily superior, but `jest` tends to have more adoption with modern webstacks as tests execute more efficiently (and in parallel)
  - For a good / recent comparison of the frameworks, take a look at [Mocha vs. Jest: comparison of two testing tools for Node.js](https://www.merixstudio.com/blog/mocha-vs-jest/)
- As a general rule, I like to use [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) when possible
  - Forcing tests upfront makes refactoring significantly simpler
  - Having tests that describe requirements helps keep requirements, often lost in issue systems like Jira / Gitlab Issues, front and center in the code for reference
  - TDD can be pretty hard when starting a new project / type of work because there isn't a good history of test develpoment guiding code
  - If a code base is developed without TDD / Tests, it can be very difficult to go back and retrofit when refactoring is required
    - Having done test retrofitting, you tend to find [Code smells](https://en.wikipedia.org/wiki/Code_smell) and [Design smells](https://en.wikipedia.org/wiki/Design_smell) that could have been found up front with good test design / coverage
- It is very difficult to maintain 100% unit test code coverage on any code base but in my experience, it is often important to keep coverage above 80%
  - Some code bases just don't have easy ways to exercise code without adding a lot of difficult to maintain injection style mocks (which makes test hard to maintain and brittle to code change)
- As a general philosophy, I like the [Arrange-Act-Assert pattern](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) for writing tests
  - When possible, construct code in units that return values that can be tested and with dependencies that can be mocked
    - Following that strategy secretly makes your code composable and avoids having to perform `unnatural` acts to test it
