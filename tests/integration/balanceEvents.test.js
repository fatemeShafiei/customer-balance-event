const request = require('supertest');
const db = require("../../models");
const moment = require("moment/moment");
const BalanceEvents = db.balanceEvents;

describe('/api/events', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => {
        server.close();
        await BalanceEvents.destroy({truncate: true});
    });
    describe('POST /:market/:customerId', () => {

        let market;
        let customerId;
        let eventBody;

        const exec = async () => {
            return await request(server)
                .post(`/api/events/${market}/${customerId}`)
                .send(eventBody);
        }

        beforeEach(() => {
            market = 'FI';
            customerId = 'fi.customer-03';
            eventBody = {
                reason: 'ATTEND_EVENT',
                reasonTime: 1702261479942,
                businessUnit: 'BU03',
                type: 'INCREASED',
                value: 19
            }
        })

        it('should return 400 if event.type is not INCREASED or DECREASED', async () => {
            eventBody.type = 'test';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if event.reasonTime is not a number', async () => {
            eventBody.reasonTime = 'test';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the event if it is valid', async () => {
            await exec();
            eventBody.market = market;
            eventBody.customerId = customerId;
            const event = await BalanceEvents.findAll({
                where: eventBody
            });

            expect(event).not.toBeNull();
        });

    });
    describe('GET /:market/:customerId/:reason/:year', () => {

        let market;
        let customerId;
        let reason;
        let year;

        const exec = async () => {
            return await request(server)
                .get(`/api/events/${market}/${customerId}/${reason}/${year}`)
        }

        beforeEach(() => {
            market = 'FI';
            customerId = 'fi.customer-03';
            reason = 'ATTEND_EVENT';
            year = '2023';

        })

        it('should return 400 if year is not between 1970 and 3000', async () => {
            year = '2';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the event if it is valid', async () => {
            await exec();
            const event = await BalanceEvents.findAll({
                where: {
                    market: market,
                    customerId: customerId,
                    reason: reason,
                    reasonTime: moment(year, 'Y').format('YYYY-MM-DD HH:mm:ss')
                }
            });

            expect(event).not.toBeNull();
        });

    });
})