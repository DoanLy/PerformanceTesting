# Performance Testing with AXIOS

#### Project website link: https://demoqa.com<br>

---

## Technology: <br>

- Environment: Node.js <br>
- Library: Axios <br>
- Build tool: npm <br>
- Language: Javascript <br>
- Report: Custom report using Excel<br>
- IDE: Visual Studio Code <br>

---

## Project Architecture: <br>

![Cypress_project_Arch](data/FlowChart.png)

---

## Test scenario:<br>

<ol>
<li>Automate Register Function</li>

- Peak load testing: Register 100 accounts simultaneously
- Load testing: Register 10 accounts per second for a duration of 5 minutes
- Stress testing: Register 10 accounts at a time, with a 3-second interval between each batch, repeated 5 times

<li>Automate Login Function</li>

- Peak load testing: Login 100 accounts simultaneously
- Load testing: Login 100 accounts per second for a duration of 5 minutes
- Stress testing: Login 100 accounts at a time, with a 3-second interval between each batch, repeated 5 times

<li>Automate Add Book to List Function</li>

- Peak load testing: 100 users adding books to their profiles simultaneously
- Load testing: 10 users adding books to their profiles every second for a duration of 5 minutes
- Stress testing: 10 users adding books to their profiles at once, with a 3-second interval between each batch, repeated 5 times

</ol>

---

## Run the Automation Script:

1. Open cmd to the project folder using VS Code
2. Type this command:
   npm run dev
3. After Complete the test execution Report will generate to reports Folder

---

## Test Report:

![Screenshot from 2022-01-28 16-20-22](https://user-images.githubusercontent.com/38497405/151536227-68fa1ed1-415b-4d24-aca0-c039279b58d3.png)
