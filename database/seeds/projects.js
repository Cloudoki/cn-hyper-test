const db = require('lib/helpers/db')
const log = require('lib/helpers/log')
const Project = require('lib/models').Project

const testProjects = [
  {
    // userId: fk_to_user,
    name: 'Cloudoki Example Project',
    host: 'github', // one of github, bitbucket
    repos: [
      'git@github.com:Cloudoki/cn-hyper-test-api.git',
      'git@github.com:Cloudoki/cn-hyper-test-blm.git'
    ],
    environments: [
      {
        id: 'local',
        branch: 'refs/heads/master',
        server: 'http://localhost:8000',
        swagger: 'http://localhost:8000/0/api-docs',
        recipients: [
          'hyper.test.dev@cloudoki.com'
        ],
        authentication: [{
          id: 'api_key',
          value: 'Bearer SOMEKEYSOMEKEYLOCAL'
        }],
        tester: {
          attempts: 2,
          concurrency: 3,
          delayAttempt: 50,
          delay: 20
        }
      },
      {
        id: 'staging',
        branch: 'refs/heads/staging',
        server: 'http://staging.example.com',
        swagger: 'http://staigng.example.com/swagger.json',
        recipients: [
          'hyper.test.dev@cloudoki.com'
        ],
        authentication: [{
          id: 'api_key',
          value: 'Bearer SOMEKEYSOMEKEYSTAGING'
        }],
        tester: {
          attempts: 2,
          concurrency: 3,
          delayAttempt: 50,
          delay: 20
        }
      }
    ]
  }
]

db.connect((err, db) => {
  if (err) {
    log.fatal({ err: err }, 'Could not connect to the database. Exiting.')
    process.exit()
  }

  performSeed()
})

function performSeed () {
  testProjects.forEach(function (testProject) {
    let proj = new Project(testProject)
    proj.save((err, p) => {
      if (err) {
        log.error({ projectName: testProject.name, err: err }, 'Could not create projects seed')
        return
      }
      log.info({ projectName: testProject.name, _id: p._id }, 'Seed project inserted')
    })
  })
}
