
const expectedData = [
    'Adrian Venti Trainerella', 'Auditones Twisted Tour', 'Critter Girls', 'Frank Jupiter LOL-palooza', 'Green Mild Cold Capsicum Small Night In',
    'Jill Black LOL-palooza', 'Manish Ditch Trainerella', 'Propeller', 'Squint-281 Small Night In', 'Squint-281 Twisted Tour', 'Summon Twisted Tour',
    'The Black Dashes Small Night In', 'Werewolf Weekday LOL-palooza', 'Wild Antelope Small Night In', 'Wild Antelope Trainerella',
    'Winter Primates LOL-palooza', 'YOUKRANE Trainerella', 'Yanke East Small Night'
]


describe('Display Festivals', () => {
    const apiUrl = Cypress.env('apiUrl');

    //Pre-requisite - This test needs to have the application running locally and as part of the pipeline, 
    //application should be started using ng serve command
    it('01_UI_Bands For Each Festival can be displayed', () => {
        cy.visit('');
        const actualFestivalData: any = [];
        cy.get('body').wait(1000).then($body => {
            assert.isTrue($body.find("ol").length >= 1);
        });
        cy.get('ol > li').should('have.length.at.least', 1).each($liElement => {
            actualFestivalData.push($liElement.text());
            cy.wrap(actualFestivalData).as('actualFestivalArray');
        });

        //During the test, noticed that data is returned randomly.
        //In real world, we would look at source of data(ideally with api Call) and then that could act as expected data
        //Here for illustration, i have hard coded some sample data as expected data
        cy.get('@actualFestivalArray').then(actualArray => {
            assert.equal(JSON.stringify(actualArray), JSON.stringify(expectedData));
        });
    });

    //In this test, just confirming that API call response contains substring 
    //In real world, we would look at source of data(ideally with Database) and then that could act as expected data
    //Here for illustration, i have hard coded some sample data as expected data 
    it('02_API should return correct data', () => {
        cy.request({
            method: 'GET',
            url: apiUrl,
            failOnStatusCode: false
        }).then(response => {
            assert.equal(response.status, 200);
            assert.isTrue(JSON.stringify(response.body).trim().includes('Auditones'));
        });
    });

    //Normally we'd get allowed throttling limit as requirement, in this case i didnt have that info.
    //observed if i run it about 20 times, a few calls fail. So i am going on that assumption but in real life, number of calls in set time can be worked out accordingly.
    //and test could be much easier like make 5 calls with 1 sec interval and 6th call should bef 429. that ll be more concrete test then this below
    it('03_Throttled Error should be returned, When number of allowed calls in set limit is breached', () => {
        let iteration = Array.from(Array(20).keys());
        const accum = (cmds) => {
            const results = []
            cmds.forEach(() => {
                cy.request({ url: apiUrl, method: 'get', failOnStatusCode: false }).then(results.push.bind(results))
            });

            return cy.wrap(results)
        };

        accum(iteration)
            .then((results = []) => {
                let throttled = results.filter(st => st.status == 429);
                assert.isTrue(throttled.length > 0);
            });
    });
});