const postmark = require('postmark');
const { updateAirtableRecord } = require('../services/airtableService');

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

exports.sendReportEmail = async (req, res) => {
    const { granteeEmail, grantReference, reportId } = req;

    try {
        await client.sendEmail({
            "From": process.env.FROM_EMAIL, 
            "To": granteeEmail, 
            "Subject": `Report Submission for Grant ${grantReference}`,
            "TextBody": `Thank you for submitting your report for Grant ${grantReference}.`
        });

        await updateAirtableRecord(reportId, 'Email Sent');

        res.status(200).json({ message: 'Email sent and Airtable updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email or update Airtable: ', error });
    }
};
