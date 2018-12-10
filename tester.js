/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-sse-stress-tester
 * @file tester.js
 * @company LEEDIUM
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 10/12/2018
 * @description  Provides Javascript processing for the scenairos that are to be executed.
 **/

const config = require('./config');
const occTokenGenerator = require('./occ-token-generator');
const payload = require('./testerPayload.json');

// Array of Dummy Cards to use.
const cards = [
    ["visa", "4111111111111111"],
    ["visa", "4000000000000002"],
    ["mc", "5100080000000000 "],
    ["mc", "5200000000000007 "],
];

async function generateToken (context, events, done) {
    context.vars['token'] = await occTokenGenerator.generateToken(config.occDeployServer, config.apiKey)
    return done();
}

/**
 * Executes before each request.
 * Use this method to modify the request
 * @param requestParams (Options for Request https://artillery.io/docs/http-reference/)
 * @param context
 * @param ee
 * @param next
 */
function setHeadersAndBody (requestParams, context, ee, next) {
    requestParams.headers = {
        "Authorization": context.vars.token,
        "x-forwarded-for": "127.0.0.1"
    };
    const card = cards[parseInt(Math.random() * 4)];
    payload.cardDetails.type = card[0];
    payload.cardDetails.number = card[1];
    requestParams.json = payload;
    requestParams.method = "POST";
    requestParams.body = "hello";
    next();
}

/**
 * Method runs when a message completes and returns a response
 * @param requestParams
 * @param response
 * @param context
 * @param ee
 * @param next
 */
function showBody (requestParams, response, context, ee, next) {
    next();
}

module.exports = {
    generateToken,
    setHeadersAndBody,
    showBody
};
