import {notFound} from "next/navigation"
import {syntheticPlannerPreviewAllowed} from "@/lib/synthetic-planner-preview"
import SyntheticPlannerCheck from "@/components/account/synthetic-planner-check"
export const dynamic = "force-dynamic"
export const metadata = {title:"AVES synthetic planner UI check",robots:{index:false,follow:false}}
export default function SyntheticPlannerPage(){
  if(!syntheticPlannerPreviewAllowed({VERCEL_ENV:process.env.VERCEL_ENV,VERCEL_GIT_COMMIT_REF:process.env.VERCEL_GIT_COMMIT_REF}))notFound()
  return <SyntheticPlannerCheck />
}
