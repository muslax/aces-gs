import useUser from 'lib/useUser'
import Layout from "components/Layout";
import { connect } from 'lib/database'
import ProjectGrid from 'components/ProjectGrid'
import NotFound from 'components/404'

export async function getStaticPaths() {
  const { db } = await connect()
  try {
    const rs = await db.collection('licenses').find({}, {projection: {_id: 0, slug: 1}}).toArray()
    // console.log(rs)
    const paths = rs.map((license) => ({
      params: { license: license.slug },
    }))

    return { paths, fallback: true }
  } catch (error) {
    throw error
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { db } = await connect()
  try {
    const rs = await db.collection('projects').find({license: params.license}).sort({ _id: -1 }).toArray()
    const projects = JSON.parse( JSON.stringify(rs) )
    return {
      props: { slug: params.license, projects },
      revalidate: 3, // In seconds
    }
  } catch (error) {
    throw error
  }
}

//
export default function Projects({ slug, projects }) {
  const { user } = useUser({ redirecTo: "/login" })

  if(!user || user.license != slug) return NotFound

  return (
    <Layout user={user} nav="projects">
      <div className="relative sbg-indigos-100 sbg-opacity-25">
        {/* <div className="GRADIENT w-full absolute py-24 z-0 bg-gradient-to-b from-indigo-100 opacity-25">
          <div className="h-64"></div>
        </div> */}
        <div className="relative z-10 max-w-5xl mx-auto antialiased py-10 px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:gap-10">
            {projects?.map(project => (
            <div className="col-span-2 sm:col-span-1">
              <ProjectGrid key={project.license} slug="" project={project} />
            </div>
            ))}

          </div>
          {/*  */}
          {/* <pre className="pre bg-blue-100 border border-l-4 border-indigo-200 my-8">PROJECTS {JSON.stringify(projects, null, 2)}</pre> */}
        </div>
      </div>
    </Layout>
  )
}
