const parseMultipartFormData = require('@anzp/azure-function-multipart').default;

const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const predictionEndpoint = "https://customvisionsimplon-prediction.cognitiveservices.azure.com/";

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const { files } = await parseMultipartFormData(req);

    const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": process.env.PREDICTION_KEY } });
    const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);

    const results = await predictor.classifyImage(process.env.PROJECT_ID, process.env.ITERATION_NAME, files[0].bufferFile)
    predictor.cla

    context.res = {
        status: 200,
        body: results
    };
}