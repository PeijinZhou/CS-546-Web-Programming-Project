
const reviewsMethods = require("./reviews");
const questionsdMethods = require("./questions");
const usersdMethods = require("./users");
async function test1() {
    try {
        const op1 = await reviewsMethods.getReviewById("5fb5cd906768a33e948daf2d");
        console.log(op1);
    } catch (error) {
        throw error
    }
    console.log("-----///----///---///");
    try {
        const op2 = await reviewsMethods.getReviewById("5fb5cd906768a33e948daf2d");
        // const test=await reviewsMethods.getAllReviews()
        console.log(op2);
    } catch (error) {
        throw error
    }
}
async function test2() {
    const getAll = await questionsdMethods.getAllQuestions()
    console.log(getAll);
    console.log("-----///----///---///");
    try {
        const getOne = await questionsdMethods.getQuestionById("5fb5cd906768a33e948daf2");
        console.log(getOne);
    } catch (error) {
        throw error
    }
    console.log("-----///----///---///");
    try {
        const getOne = await questionsdMethods.getQuestionById("5fb5cd906768a33e948daf2b");
        console.log(getOne);
    } catch (error) {
        throw error
    }
}
async function createDate() {
    const da = new Date();
    console.log(da);
}
/**
 * addReview
 */
async function test3() {
    await reviewsMethods.addReview("test","5fb5cd906768a33e948daf29","5fb5cd906768a33e948daf2c");
}
/**
 * updateReview
 */
async function test4(){
    const newDate= await reviewsMethods.updateReview("5fb5cd906768a33e948daf2d","this is a new review");
    console.log(newDate);
}
/**
 * updateVoteUp
 */
async function test5(){
    console.log(await reviewsMethods.updateVoteUp("5fb5cd906768a33e948daf2d","5fb5cd906768a33e948daf2a"));
}

async function test6(){
    await usersdMethods.getUserById("5fb5cd906768a33e948daf29")
}


test5()
