# Task Tracker CLI

This is a CLI app for a task from [roadmap.sh](https://roadmap.sh) built using Bun and TypeScript

This app meets all the [requirements](https://roadmap.sh/projects/task-tracker#requirements) of the task

## Usage

To use this CLI app, you need to do three simple steps (or more, if you don't have Bun/Git installed on your system):

### Setup

```bash
git clone https://github.com/SecondThundeR/task-tracker-bun.git
cd task-tracker-bun
bun install
```

### Execute

To run app, execute `index.ts` file via Bun. Here are examples of usage:

```bash
# Adding a new task
bun run index.ts add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
bun run index.ts update 1 "Buy groceries and cook dinner"
bun run index.ts delete 1

# Marking a task as in progress or done
bun run index.ts mark-in-progress 1
bun run index.ts mark-done 1

# Listing all tasks
bun run index.ts list

# Listing tasks by status
bun run index.ts list done
bun run index.ts list todo
bun run index.ts list in-progress
```

## License

The app is distributed under the MIT license. More details in the [LICENSE file](/LICENSE)
