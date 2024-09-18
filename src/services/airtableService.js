const Airtable = require('airtable');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

exports.updateAirtableRecord = async (recordId, status) => {
    try {
        base('Reports').update({
          records: [
            {
                id: recordId,
                fields: {
                    "Email Status": status
                }
            }
        ]
        });
        console.log('Airtable record updated successfully');
    } catch (error) {
       throw error;
    }
};