const faker = require('faker');

const makeUser = () => { 
  return {
    first_name: faker.name.firstName(), 
    last_name: faker.name.lastName(), 
    email: faker.internet.email(),
    pronouns: 'they/them', 
    employment_status: 'full_time', 
    employer: faker.company.companyName(), 
    role: 'user'
  }
}

const makeApplication = (user_id, cohort_id) => ({
  user_id: user_id, 
  cohort_id: cohort_id, 
  accepted_test: false, 
  accepted_cohort: false
})

const makeNUsers = (n) => Array.from(Array(n)).map(item => makeUser())

const identities = [
  {
    name: 'woman', 
    gender: true, 
    user_generated: false
  }, 
  {
    name: 'non-binary', 
    gender: true, 
    user_generated: false
  }
]

const cohorts = [
  {
      name: 'React Cohort 8', 
      welcome_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe excepturi reprehenderit velit qui necessitatibus nihil eum amet voluptatibus quas perferendis iure odio et, sit, a molestias ratione nisi laudantium dignissimos, quos consequuntur nostrum unde consequatur! Alias fuga voluptatibus adipisci unde ratione, accusamus quasi reprehenderit, eum dignissimos, ipsum consequatur perferendis possimus.', 
      thank_you_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sunt minima recusandae, dolorum iure soluta quo.'

  }, 
  {
      name: 'Product Design Cohort 4', 
      welcome_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe excepturi reprehenderit velit qui necessitatibus nihil eum amet voluptatibus quas perferendis iure odio et, sit, a molestias ratione nisi laudantium dignissimos, quos consequuntur nostrum unde consequatur! Alias fuga voluptatibus adipisci unde ratione, accusamus quasi reprehenderit, eum dignissimos, ipsum consequatur perferendis possimus.', 
      thank_you_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad sunt minima recusandae, dolorum iure soluta quo.'

  }
]



const questions = [
  {
    question_text: 'Do you live in or are you able to regularly commute to downtown Toronto?', 
    allow_multiple_answers: false, 
    required: true
  }, 
  {
    question_text: 'How did you hear about Bridge?', 
    allow_multiple_answers: false, 
    required: true
  }, 
  {
    question_text: 'Have you applied to any Bridge cohorts before?', 
    allow_multiple_answers: true, 
    required: true
  }, 
  {
    question_text: 'Current employment status', 
    allow_multiple_answers: false, 
    required: true
  }, 
  {
    question_text: 'Will you be looking for a new job in June 2019 (when you graduate from Bridge)? ', 
    allow_multiple_answers: false, 
    required: true
  }

]

const answer_choices = [
  ['Yes', 'No'], 
  ['Twitter', 'LinkedIn', 'Facebook', 'Family or Friend', 'Event', 'Other'], 
  ['Cohort 1', 'Cohort 2', 'Cohort 3', 'Cohort 4', 'Cohort 5'], 
  ['Employed Full Time', 'Employed Part Time', 'In School Full Time', 'Unemployed and Looking', 'Unemployed and not looking'], 
  ['Yes', 'No', 'Not sure']
]

exports.seed = (knex) => {
  const deleteRecords = [knex('users').del(), knex('identities').del(), knex('cohorts').del(), knex('questions').del()]
  const deleteRecordsWithDependencies = [knex('answer_choices').del(), knex('cohort_questions').del(), knex('applications').del()]
  const createRecords = [knex('users').returning('id').insert(makeNUsers(20)), knex('identities').returning('id').insert(identities), knex('cohorts').returning('id').insert(cohorts), knex('questions').returning('id').insert(questions), knex('cohort_questions').del()]

  // Deletes ALL existing entries
  return Promise.all(deleteRecordsWithDependencies)
    .then(() => Promise.all(deleteRecords)
    .then(() => {
      // create new user and identity records
      return Promise.all(createRecords)
        .then((results) => {
          // create new user_identities relations records
          const user_identities = results[0].map(user => ({user_id: user, identity_id: results[1][Math.floor(Math.random() * results[1].length)]}))
          const answer_choices_records = [].concat.apply([],answer_choices.map((set, index) => set.map(option => ({
            answer_text: option,
            question_id: results[3][index]
          }))))

          const cohort_questions = [].concat.apply([],results[2].map(cohort => results[3].map(question => ({
            question_id: question, 
            cohort_id: cohort
          }))))

          const applications = results[0].map(user => makeApplication(user, results[2][Math.floor(Math.random() * results[2].length)]))

          const createRecordsAgain = [knex('applications').returning('id').insert(applications), knex('user_identities').insert(user_identities), knex('answer_choices').insert(answer_choices_records), knex('cohort_questions').insert(cohort_questions)]

          return Promise.all(createRecordsAgain)
            .then((results) => {
              // console.log(results);
              // return knex.select('*').from('applications')
              //   .then(rows => {
              //      console.log(rows)
              //   })

              // return knex.select('*')
              //            .from('cohorts') 
              //            .leftJoin('')
              
            })
        })
    }))
  
};


