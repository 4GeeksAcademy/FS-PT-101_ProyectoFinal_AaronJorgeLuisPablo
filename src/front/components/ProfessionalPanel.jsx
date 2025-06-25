import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import collection from "../services/collection"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { LogoBinario } from "./PdfLogo";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

pdfMake.vfs = pdfFonts?.pdfMake?.vfs || pdfFonts.vfs || {};

export const ProfessionalPanel = () => {
	const [activities, setActivities] = useState(null)
	const [infoActivities, setInfoActivities] = useState(null)
	const [limit, setLimit] = useState(15)
	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState("")
	const [infoAct, setInfoAct] = useState({
		name: "", desc: "", type: "LEISURE", location: "", media: [],
		price: "", slots: "", start_date: "", end_date: "", meeting_point: ""
	})
	const [formData, setFormdata] = useState({
		name: "", desc: "", type: "LEISURE", location: "",
		price: "", slots: "", start_date: "", end_date: "", meeting_point: ""
	})

	const [media, setMedia] = useState([])
	const [response, setResponse] = useState({ message: "", success: false })

	const setRef = useRef(null)
	const setImg = useRef(null)
	const modalRef = useRef(null)

	const loadActivities = async () => {
		const resp = await collection.getMyActivities()
		if ("error" in resp)
			setActivities([])
		else {
			setActivities([...resp])
			// Para coger los info_activity sin repetir y ponerlos en el dropdown
			const infos = [];
			const infosIDs = new Set();
			for (let item of resp) {
				const act = item.info_activity
				if (!infosIDs.has(act.id)) {
					infosIDs.add(act.id);
					infos.push(act);
				}
			}
			setInfoActivities(infos)
		}
	}

	const generatePDF = (activity) => {
		const tableBody = [["X", "Usuario", "Nombre", "Teléfono", "DNI"]]

		activity.inscriptions.forEach(({ id, username, name, surname, telephone, NID }) => {
			tableBody.push([" ", username, name + " " + surname, telephone, NID]);
		})
		const docDefinition = {
			content: [
				{
					image: LogoBinario,
					width: 40,
					margin: [450, 0, 0, 0]
				},
				{ text: activity.info_activity.name, style: "header" },
				{ text: "Profesional: (@" + activities[0].info_activity.professional.user.username + ") " + activities[0].info_activity.professional.user.name + " " + activities[0].info_activity.professional.user.surname },
				{ text: "Fechas: " + formatDate(new Date(activity.start_date)) + " - " + formatDate(new Date(activity.end_date)) },
				{ text: "Punto de encuentro: " + activity.meeting_point },
				{ text: "Usuarios inscritos:" },
				{
					style: "tableExample",
					table: {
						headerRows: 1,
						widths: [10, 120, "*", 70, 70],
						body: tableBody,
					}
				}
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					marginBottom: 15,
				},
				tableExample: {
					margin: [0, 5, 0, 15],
				},
			},
		}

		pdfMake.createPdf(docDefinition).open(); // También puedes usar .download("inscripciones.pdf")
	}

	const formatDate = (date) => {
		let date2 = new Date(new Date(date).getTime() + 7200000)
		return date2.toLocaleString("en-GB", { timeZone: "UTC" }).slice(0, -3).replace(",", "")
	}

	const getTomorrow = () => {
		const tomorrow = new Date(Date.now())
		tomorrow.setDate(tomorrow.getDate() + 1)
		return `${String(tomorrow.getFullYear())}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`
	}
	const getOneYear = () => {
		const oneYear = new Date(Date.now())
		oneYear.setFullYear(oneYear.getFullYear() + 1)
		return `${String(oneYear.getFullYear())}-${String(oneYear.getMonth() + 1).padStart(2, '0')}-${String(oneYear.getDate()).padStart(2, '0')}`

	}

	const compareFunction = (a, b) => {
		return b.start_date.localeCompare(a.start_date)
	}

	const handleSeeMore = () => {
		setLimit(limit + 10)
	}

	const handleCreate = async (e) => {
		e.preventDefault()
		let success = false
		if (infoAct.name != "") {
			const resp = await collection.createActivity(formData)
			console.log(resp.success)
			if (!resp.success)
				setResponse({ message: "No se pudo crear la actividad", error: true })
			else {
				success = true
				setResponse({ message: "Actividad creada con éxito", error: false })
			}
		} else {
			const request_body = new FormData()
			Object.entries(formData).forEach(([clave, valor]) => {
				request_body.append(clave, valor)
			})
			console.log(media)
			media.forEach((url)=>{
				if (url != "")
				request_body.append("media", url)
			})
			const resp = await collection.createInfoActivity(request_body)
			console.log(resp)
			if (!resp.success)
				setResponse({ error: true, message: "No se pudo crear la actividad" })
			else {
				success = true
				setResponse({ error: false, message: "Actividad creada con éxito" })
			}
		}
		// if (success) {
		// 	loadActivities()
		// 	window.bootstrap.Modal.getInstance(modalRef.current).hide()
		// 	handleReset()
		// }
	}

	const handleChange = async (e) => {
		if (e.target.name == "start_date") {
			if (e.target.value != "") {
				setFormdata({ ...formData, [e.target.name]: (new Date(e.target.value)).toISOString() })
				setStartDate(e.target.value)
			}
		}
		else if (e.target.name == "end_date") {
			if (e.target.value != "") {
				setFormdata({ ...formData, [e.target.name]: (new Date(e.target.value)).toISOString() })
				setEndDate(e.target.value)
			}
		} else {
			setFormdata({
				...formData, [e.target.name]: e.target.value
			})
		}
	}

	const handleReset = () => {
		setStartDate("")
		setEndDate("")
		setMedia([])
		setInfoAct({
			name: "", desc: "", type: "LEISURE", location: "", media: [],
			price: "", slots: "", start_date: "", end_date: "", meeting_point: ""
		})
	}

	const handleMediaUpload = async (e) => {
		const files = e.target.files
		let medias = []
		if (files.length > 0)
		for (let f of files) {
			const data = new FormData()
			try {
				data.append("file", f)
				data.append("upload_preset", "Preset_Nomadik")
				data.append("cloud_name", "dsn6qtd9g")
				const resp = await fetch('https://api.cloudinary.com/v1_1/dsn6qtd9g/image/upload', {
					method: 'POST',
					body: data,
				})
				const result = await resp.json()
				medias.push(result.secure_url)

			} catch (error) {
				console.log(error)
			}
		}
		setMedia([...media, ...medias])
	}

	useEffect(() => {
		loadActivities()
	}, [])

	useEffect(() => {
		if (infoAct.name != "") {
			setRef.current.disabled = true
			setImg.current.disabled = true
		}
		else {
			setRef.current.disabled = false
			setImg.current.disabled = false
		}
		setFormdata({
			...formData,
			desc: infoAct.desc,
			id: infoAct.id,
			location: infoAct.location,
			name: infoAct.name,
			type: infoAct.type
		})
	}, [infoAct])

	return (
		<div className="py-4 row px-4">
			<div className="d-flex justify-content-end">
				<button className="btn Button text-nowrap w-auto mb-3 px-5 mx-auto fw-semibold" data-bs-toggle="modal" data-bs-target="#ActivityModal">Nueva actividad</button>

			</div>
			{
				activities && activities.length > 0 ?
					<div className="table-responsive mx-1 mx-md-auto">
						<table className="table table-hover p-2 BgBackground">
							<thead>
								<tr className="BgSecondary">
									<th scope="col" className="text-start ps-md-4 w-50 TextDark text-nowrap user-select-none">Nombre</th>
									<th scope="col" className="text-center TextDark text-nowrap user-select-none">Fecha inicio</th>
									<th scope="col" className="text-center TextDark text-nowrap user-select-none">Fecha fin</th>
									<th scope="col" className="text-center TextDark text-nowrap user-select-none d-none d-md-table-cell">Ocupación</th>
									<th scope="col" className="text-center TextDark d-none d-md-table-cell"></th>
								</tr>
							</thead>
							<tbody className="table-group-divider InscriptionsTable">
								{activities?.sort(compareFunction)
									.filter((item, i) => i < limit)
									.map((item, i) => (
										<React.Fragment key={i}>
											<tr>
												<td className="ps-4 align-content-center d-none d-md-table-cell">
													<Link className="text-decoration-none fw-semibold" to={"/activities/" + item.id}>
														{item.info_activity.name}
													</Link>
												</td>
												<td className="align-content-center d-table-cell d-md-none" rowSpan={2}>
													<Link className="text-decoration-none fw-semibold" to={"/activities/" + item.id}>
														{item.info_activity.name}
													</Link>
												</td>
												<td className="text-center fw-semibold align-middle">
													{formatDate(new Date(item.start_date))}
												</td>
												<td className="text-center fw-semibold align-middle d-none d-md-table-cell">
													{formatDate(new Date(item.end_date))}
												</td>
												<td className="text-center fw-semibold align-middle d-md-none d-table-cell">
													{formatDate(new Date(item.end_date))}
												</td>
												<td className="text-center fw-semibold align-middle PriceTD d-none d-md-table-cell">
													{item.inscriptions.length + " / " + item.slots}
												</td>
												<td className="text-center fw-semibold align-middle d-none d-md-flex flex-column">
													<button className="btn text-decoration-none text-danger" onClick={() => generatePDF(item)}>
														<i className="fa-solid fa-file-pdf me-2"></i> PDF
													</button>
												</td>
											</tr>
											<tr className="d-md-none d-table-row">
												<td className="text-center fw-semibold align-middle PriceTD">
													{item.inscriptions.length + " / " + item.slots}
												</td>
												<td className="text-center fw-semibold align-middle InscriptionsTableEndDate">
													<button className="btn text-decoration-none text-danger" onClick={() => generatePDF(item)}>
														<i className="fa-solid fa-file-pdf me-2"></i> PDF
													</button>
												</td>
											</tr>
										</React.Fragment>
									))}
							</tbody>
						</table>
						<div className="row mx-auto">
							{limit < activities?.length ? (
								<button className="mx-auto btn w-auto text-decoration-none text-dark fw-semibold border-white" onClick={handleSeeMore}>
									Ver más
								</button>
							) : ""}
						</div>
					</div>
					: <p className="text-center">No has creado ninguna actividad</p>
			}
			<div className="modal fade p-0" ref={modalRef} id="ActivityModal" tabIndex="-1" aria-labelledby="ActivityModal" aria-hidden="true">
				<div className="modal-dialog modal-fullscreen">
					<div className="modal-content mt-auto overflow-auto">
						<div className="modal-header BgPrimary" data-bs-theme="dark">
							<h1 className="modal-title text-white fw-bold fs-5" id="exampleModalLabel">Crear actividad</h1>
							<button type="button" className="btn-close me-3" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form className="container" onSubmit={handleCreate}>
							<div className="modal-body row overflow-auto">
								<div className="col-12">
									<div className="row">
										<div className="form col-12 col-md-6 px-0">
											<div className="dropdown">
												<button className="btn Button dropdown-toggle w-100 text-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
													¿Desea repetir una actividad?
												</button>
												<ul className="dropdown-menu w-100">
													{infoActivities?.map((item, index) => { return <li key={index} onClick={() => setInfoAct(item)}><a className="dropdown-item">{item.name}</a></li> })
													}
												</ul>
											</div>
										</div>
									</div>
								</div>

								<div className="col-12 col-md-6 px-0">
									<fieldset ref={setRef}>
										<div className="my-3">
											<div className="form-floating">
												<input required className="form-control text-capitalize" title="El nombre de usuario debe contener al menos tres letras" type="text" name="name" id="name" minLength="4" maxLength="80" placeholder="" onChange={handleChange} value={formData.name} />
												<label className="fs-6" htmlFor="name"><span className="text-danger">∗</span> Nombre de la actividad</label>
											</div>
										</div>
										<div className="my-3">
											<div className="form-floating">
												<input required className="form-control text-capitalize" type="text" name="location" id="location" maxLength="50" placeholder="" onChange={handleChange} value={formData.location} />
												<label className="fs-6" htmlFor="location"><span className="text-danger">∗</span> Localización</label>
											</div>
										</div>
										<div className="my-3">
											<div className="form-floating mx-auto">
												<select className="form-select" aria-label="Type select menu" id="type" name="type" placeholder="" onChange={handleChange} value={formData?.type}>
													<option value="LEISURE">De ocio</option>
													<option value="SPORT">Deportiva</option>
													<option value="TOURISM">Turística</option>
												</select>
												<label className="fs-6" htmlFor="type">Tipo</label>
											</div>
										</div>
										<div className="my-3">
											<div className="form mx-auto">
												<label className="fs-6" htmlFor="desc">Descripción</label>
												<textarea name="desc" className="form-control mt-2" style={{ height: '280px' }} id="desc" placeholder="" onChange={handleChange} value={formData.desc} />
											</div>
											<div id="descHelpBlock" className="col-12 form-text">
												Una descripción sobre la actividad, toda la información necesaria para que los usuarios se interesen por la ella.
											</div>
										</div>
									</fieldset>
								</div>
								<div className="col-12 col-md-6">
									<div className="my-3">
										<div className="form-floating mx-auto">
											<input required type="datetime-local" name="start_date" step={900} min={getTomorrow() + "T00:00"} max={getOneYear() + "T00:00"} className="form-control" id="start_date" placeholder="" onChange={handleChange} value={startDate} />
											<label className="fs-6" htmlFor="start_date">Fecha de inicio</label>
										</div>
									</div>
									<div className="my-3">
										<div className="form-floating mx-auto">
											<input required type="datetime-local" name="end_date" step={900} min={getTomorrow() + "T00:00"} max={getOneYear() + "T00:00"} className="form-control" id="end_date" placeholder="" onChange={handleChange} value={endDate} />
											<label className="fs-6" htmlFor="start_date">Fecha de fin</label>
										</div>
									</div>
									<div className="row my-3">
										<div className="col-6">
											<div className="input-group">
												<div className="form-floating mx-auto">
													<input required type="number" step="0.5" min="0" inputMode="decimal" name="price" aria-describedby="basic-addon2" className="form-control" id="price" placeholder="" onChange={handleChange} value={formData.price} />
													<label className="fs-6" htmlFor="price">Precio</label>
												</div>
												<span className="input-group-text px-3 fw-semibold fs-6" id="basic-addon2">€</span>
											</div>
										</div>
										<div className="col-6">
											<div className="form-floating mx-auto">
												<input required type="number" min="0" name="slots" className="form-control" id="slots" placeholder="" onChange={handleChange} value={formData.slots} />
												<label className="fs-6" htmlFor="slots">Plazas</label>
											</div>
										</div>
									</div>
									<div className="my-3 mt-md-5">
										<div className="form-floating">
											<input required className="form-control text-capitalize" type="text" name="meeting_point" id="meeting_point" placeholder="" onChange={handleChange} value={formData.meeting_point} />
											<label className="fs-6" htmlFor="meeting_point">Punto de encuentro</label>
										</div>
									</div>
									<div className="row my-3">
										<fieldset ref={setImg}>
											<div className="col-12 mb-3">
												<label htmlFor="media" className="form-label col-12">Imágenes de la actividad <span className="ms-2 text-light-emphasis">(.jpg)</span></label>
												<input className="form-control" type="file" accept="image/jpeg" multiple name="media" id="media" onChange={handleMediaUpload} />
											</div>
										</fieldset>
									</div>
									<div className="col-12 d-flex overflow-auto gap-3 p-3 ActFormGallery">
										{infoAct.media.length > 0 ? infoAct.media.map((item, index) => {
											return <img key={index} src={(!item.includes("http") ? "/media/events/" : "") + item} id="preview" className="img-fluid NoDeformImg" />
										}) : media.length > 0 && media.map((item, index) => <img key={index} src={item} id="preview" className="img-fluid NoDeformImg" />
										)}
									</div>

								</div>
							</div>
							<div className="modal-footer w-100 mt-5 d-flex flex-column flex-md-row justify-content-end">
								<div className="me-auto">
									<p className={"text-center fw-semibold " + (!response.error ? "text-success" : "text-danger")}>{response.message}</p>
								</div>
								<div className="d-flex gap-2">
									<button type="reset" className="btn btn-secondary" onClick={handleReset}>Reiniciar</button>
									<button type="submit" className="btn Button text-nowrap">Enviar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}