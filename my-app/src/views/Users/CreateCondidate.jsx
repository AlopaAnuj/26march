import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from "../PublicPage/NavBar";
import { Tooltip, Typography, Grid, Button } from "@mui/material";
import ToolTipText from "./ToolTipText";
import DatePicker from "react-datepicker";
import Footer from "../PublicPage/Footer";
import stateDistrict from "./stateDistrict.json";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import SuccessDialog from "../PublicPage/SuccessDialog";

const CreateCondidate = () => {
    let genderArray = [{ "key": "Male", "value": "Male" }, { "key": "Female", "value": "Female" }, { "key": "Transgender", "value": "Transgender" }, { "key": "Other", "value": "Other" }]
    let stateArray = [
        { "key": "Andhra Pradesh", "value": "Andhra Pradesh" },
        { "key": "Arunachal Pradesh", "value": "Arunachal Pradesh" },
        { "key": "Assam", "value": "Assam" },
        { "key": "Bihar", "value": "Bihar" },
        { "key": "Chhattisgarh", "value": "Chhattisgarh" },
        { "key": "Goa", "value": "Goa" },
        { "key": "Gujarat", "value": "Gujarat" },
        { "key": "Haryana", "value": "Haryana" },
        { "key": "Himachal Pradesh", "value": "Himachal Pradesh" },
        { "key": "Jharkhand", "value": "Jharkhand" },
        { "key": "Karnataka", "value": "Karnataka" },
        { "key": "Kerala", "value": "Kerala" },
        { "key": "Maharashtra", "value": "Maharashtra" },
        { "key": "Madhya Pradesh", "value": "Madhya Pradesh" },
        { "key": "Manipur", "value": "Manipur" },
        { "key": "Meghalaya", "value": "Meghalaya" },
        { "key": "Mizoram", "value": "Mizoram" },
        { "key": "Nagaland", "value": "Nagaland" },
        { "key": "Odisha", "value": "Odisha" },
        { "key": "Punjab", "value": "Punjab" },
        { "key": "Goa", "value": "Goa" },
        { "key": "Rajasthan", "value": "Rajasthan" },
        { "key": "Sikkim", "value": "Sikkim" },
        { "key": "Tamil Nadu", "value": "Tamil Nadu" },
        { "key": "Tripura", "value": "Tripura" },
        { "key": "Telangana", "value": "Telangana" },
        { "key": "Uttar Pradesh", "value": "Uttar Pradesh" },
        { "key": "Uttarakhand", "value": "Uttarakhand" },
        { "key": "West Bengal", "value": "West Bengal" },

        { "key": "Assam Rifles - ARF", "value": "Assam Rifles - ARF" },
        { "key": "Border Security Force - BSF", "value": "Border Security Force - BSF" },
        { "key": "Central Industrial Security Force - CISF", "value": "Central Industrial Security Force - CISF" },
        { "key": "Central Reserve police Force - CRPF", "value": "Central Reserve police Force - CRPF" },
        { "key": "Indo-Tibetan Border Police - ITBP", "value": "Indo-Tibetan Border Police - ITBP" },
        { "key": "Sashastra Seema Bal - SSB", "value": "Sashastra Seema Bal - SSB" },
        { "key": "Services Sports Control Board - SSCB", "value": "Services Sports Control Board - SSCB" },

        { "key": "Andaman & Nicobar (UT)", "value": "Andaman & Nicobar (UT)" },
        { "key": "Chandigarh (UT)", "value": "Chandigarh (UT)" },
        { "key": "Dadra & Nagar Haveli and Daman & Diu (UT)", "value": "Dadra & Nagar Haveli and Daman & Diu (UT)" },
        { "key": "Delhi [National Capital Territory (NCT)]", "value": "Delhi [National Capital Territory (NCT)]" },
        { "key": "Jammu & Kashmir (UT)", "value": "Jammu & Kashmir (UT)" },
        { "key": "Ladakh (UT)", "value": "Ladakh (UT)" },
        { "key": "Lakshadweep (UT)", "value": "Lakshadweep (UT)" },
        { "key": "Puducherry (UT)", "value": "Puducherry (UT)" }
    ]
    let roleArray = [
        { "key": "Athlete", "value": "Athlete" },
        { "key": "Coach", "value": "Coach" },
        { "key": "Referee", "value": "Referee" },
        { "key": "Doctor", "value": "Doctor" },
        { "key": "Physiotherapist", "value": "Physiotherapist" },
        { "key": "Manager", "value": "Manager" },
        { "key": "Media", "value": "Media" },
        { "key": "Fan", "value": "Fan" },
        { "key": "Official", "value": "Official" }
    ]
    let roleArray2 = [
        { "key": "Coach", "value": "Coach" },
        { "key": "Referee", "value": "Referee" },
        { "key": "Doctor", "value": "Doctor" },
        { "key": "Physiotherapist", "value": "Physiotherapist" },
        { "key": "Manager", "value": "Manager" },
        { "key": "Media", "value": "Media" },
        { "key": "Fan", "value": "Fan" },
        { "key": "Official", "value": "Official" }
    ]
    const [secondaryRoleArray, setSecondaryRoleArray] = useState(roleArray2)
    const [fullName, setUserName] = useState('')
    const [guardianName, setGuardianName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [contactNumber, setContactNumber] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [districtOptions, setDistrictOptions] = useState([])
    const [district, setDistrict] = useState('')
    const [address, setAddress] = useState('')
    const [primaryRole, setPrimaryRole] = useState('')
    const [secondaryRole, setSecondaryRole] = useState('')
    const [otherRole, setOtherRole] = useState('')
    const [photo, setPhoto] = useState('')
    const [birthCertificate, setBirthCertificate] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [checkBox, setCheckBox] = useState(true)
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [registrationError, setRegistrationError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [fullNameError, setFullNameError] = useState('')
    const [guardianNameError, setGuardianNameError] = useState('')
    const [dateOfBirthError, setDateOfBirthError] = useState('')
    const [contactNumberError, setContactNumberError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [stateError, setStateError] = useState('')
    const [districtError, setDistrictError] = useState('')
    const [addressError, setAddressError] = useState('')
    const [primaryRoleError, setPrimaryRoleError] = useState('')
    const [secondaryRoleError, setSecondaryRoleError] = useState('')
    const [photoError, setPhotoError] = useState('')
    const [birthCertificateError, setBirthCertificateErrorError] = useState('')
    const [aadharError, setAadharError] = useState('')
    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate()

    const handleFormSubmit = () => {
        setFullNameError('')
        setGuardianNameError('')
        setDateOfBirthError('')
        setContactNumberError('')
        setGenderError('')
        setEmailError('')
        setStateError('')
        setDistrictError('')
        setAddressError('')
        setPrimaryRoleError('')
        setSecondaryRoleError('')
        setPhotoError('')
        setBirthCertificateErrorError('')
        setAadharError('')
        if ('' === fullName) {
            setFullNameError('Please enter full name')
            return
        }
        if ('' === guardianName) {
            setGuardianNameError('Please enter guardian name')
            return
        }
        if ('' === dateOfBirth) {
            setDateOfBirthError('Please enter date of birth')
            return
        }
        if ('' === contactNumber) {
            setContactNumberError('Please enter contact number')
            return
        }
        if ('' === gender) {
            setGenderError('Please select gender')
            return
        }
        if ('' === email) {
            setEmailError('Please enter contact number')
            return
        }
        if ('' === state) {
            setStateError('Please select state')
            return
        }
        if ('' === district) {
            setDistrictError('Please select district')
            return
        }
        if ('' === address) {
            setAddressError('Please enter condidate address')
            return
        }
        if ('' === primaryRole) {
            setPrimaryRoleError('Please select primary role.')
            return
        }
        if ('' === secondaryRole) {
            setSecondaryRoleError('Please select secondary role.')
            return
        }
        if ('' === photo) {
            setPhotoError('Choose the photo.')
        }
        if ('' === birthCertificate) {
            setBirthCertificateErrorError('Choose the birth certificate.')
        }
        if ('' === aadhar) {
            setAadharError('Choose Aadhar')
        }
        if (fullNameError === '' && guardianNameError === '' && dateOfBirthError === '' && contactNumberError === '' && genderError === '' && emailError === '' && stateError === '' && districtError === '' && addressError === '' && primaryRoleError === '' && secondaryRoleError === '' && photoError === '' && birthCertificateError === '' && aadharError === '') {
            registerCondidate()
        }
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const registerCondidate = async () => {
        let dataToSend = {
            fullName,
            guardianName,
            dateOfBirth,
            address,
            contactNumber,
            gender,
            state,
            district,
            email,
            primaryRole,
            secondaryRole,
            otherRole,
            photo: await convertToBase64(photo),
            birthCertificate: await convertToBase64(birthCertificate),
            aadhar: await convertToBase64(aadhar)
        }
        try {
            let result = await axios({
                method: "POST",
                url: "/api/userservice/addCondidate",
                headers: { 'x-access-token': user.acessToken, 'Accept': 'multipart/form-data' },
                data: dataToSend,
                credentials: 'include'
            });

            if (result && result.status === 200) {
                setRegistrationSuccess(true)
            }
            else {
                setErrorMessage("Something went wrong.")
                setRegistrationError(true)
            }
        }
        catch (err) {
            console.log(err)
            if (err.response && err.response.status === 422) {
                setErrorMessage(err.response.data.error.details[0].message)
            } else {
                setErrorMessage("Something went wrong.")
            }
            setRegistrationError(true)
        }
    }
    const handleBack = () => {
        navigate('/userhome')
    }
    var removeByAttr = function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }

    const handlePrimaryRole = (selectedItem) => {
        setPrimaryRole(selectedItem);
        let updatedSecondaryOptions = removeByAttr(roleArray, 'key', selectedItem);
        setSecondaryRoleArray(updatedSecondaryOptions);
    }
    const makeOptionsForDropDown = (district) => {
        let districtArray = [];
        district && district.map((item) => {
            districtArray.push({ "key": item, "value": item });
        })
        setDistrictOptions(districtArray);
    }
    const handleState = (stateName) => {
        setState(stateName);
        stateDistrict.states.map((item) => {
            if (item.state === stateName) {
                makeOptionsForDropDown(item.districts)
            }
            else if (stateName === "Assam Rifles - ARF" || stateName === "Border Security Force - BSF" || stateName === "Central Industrial Security Force - CISF" || stateName === "Central Reserve police Force - CRPF" || stateName === "Indo-Tibetan Border Police - ITBP" || stateName === "Sashastra Seema Bal - SSB" || stateName === "Services Sports Control Board - SSCB") {
                let defaultoption = [{ "key": "NA", "value": "NA" }]
                setDistrictOptions(defaultoption)
            }
        })
    }
    const handleSuccessDialog = () => {
        setRegistrationSuccess(false);
        handleBack()
    }

    const handleErrorDialog = () => {
        setRegistrationError(false);
    }
    const handlePhoto = (image) => {
        if (image && image.size > 1048576) {
            setPhotoError('Image size is too big. Image size can not be more than 1 mb.')
        } else {
            setPhotoError("")
        }
        setPhoto(image)
    }
    const handleAadhar = (image) => {
        if (image && image.size > 1048576) {
            setAadharError('Image size is too big. Image size can not be more than 1 mb.')
        } else {
            setAadharError("")
        }
        setAadhar(image)
    }
    const handleirthCertificate = (image) => {
        if (image && image.size > 1048576) {
            setBirthCertificateErrorError('Image size is too big. Image size can not be more than 1 mb.')
        } else {
            setBirthCertificateErrorError("")
        }
        setBirthCertificate(image)
    }
    let successButton = [<Button style={{ background: "cornflowerblue", color: "white", fontSize: "14px", fontWeight: 500, borderRadius: "10%" }} onClick={handleSuccessDialog} >{"Ok"}</Button>];
    let errorButton = [<Button style={{ background: "cornflowerblue", color: "white", fontSize: "14px", fontWeight: 500, borderRadius: "10%" }} onClick={handleErrorDialog} >{"Ok"}</Button>];

    return (
        <div>
            <NavBar />
            <div className="registrationpagestyle">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <button className="buttonStyle" onClick={handleBack}>Back To Home</button>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography style={{ fontSize: "24px", color: "blue", fontWeight: 600 }}>Registration of Condidate for <b>{user.userName}</b></Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Full Name"}</label>
                            <input
                                value={fullName}
                                placeholder="Enter full name here"
                                onChange={(ev) => setUserName(ev.target.value)}
                                className={'inputBox'}
                            />
                            <label className="errorLabel">{fullNameError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Fathers’ / Mother / Legal Guardian Name"}</label>
                            <input
                                value={guardianName}
                                placeholder="Enter guardian name here"
                                onChange={(ev) => setGuardianName(ev.target.value)}
                                className={'inputBox'}
                            />
                            <label className="errorLabel">{guardianNameError}</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Date Of Birth"}</label>
                            <DatePicker className={'dropDownStyle'} selected={dateOfBirth} maxDate={new Date()} onChange={(date) => setDateOfBirth(date)} />
                            <label className="errorLabel">{dateOfBirthError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Contact Number"}</label>
                            <input
                                value={contactNumber}
                                placeholder="Enter contact number here"
                                onChange={(ev) => setContactNumber(ev.target.value)}
                                className={'inputBox'}
                            />
                            <label className="errorLabel">{contactNumberError}</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Select Gender Role"}</label>
                            <select className={'dropDownStyle'}
                                onChange={(ev) => setGender(ev.target.value)}
                            >{genderArray.map((item, index) => {
                                return <option key={index+"221s"} value={item.value}>{item.key}</option>
                            })}
                            </select>
                            <label className="errorLabel">{genderError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Email"}</label>
                            <input
                                value={email}
                                placeholder="Enter email id here"
                                onChange={(ev) => setEmail(ev.target.value)}
                                className={'inputBox'}
                            />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"State / Team / Union Territory"}</label>
                            <select className={'dropDownStyle'}
                                onChange={(ev) => handleState(ev.target.value)}
                            >{stateArray.map((item, index) => {
                                return <option key={index+"pppo"} value={item.value}>{item.key}</option>
                            })}
                            </select>
                            <label className="errorLabel">{stateError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Select District"}</label>
                            <select className={'dropDownStyle'}
                                onChange={(ev) => setDistrict(ev.target.value)}
                            >{districtOptions.map((item, index) => {
                                return <option key={index+"kkkk"} value={item.value}>{item.key}</option>
                            })}
                            </select>
                            <label className="errorLabel">{districtError}</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Address"}</label>
                            <input
                                value={address}
                                placeholder="Enter address here"
                                onChange={(ev) => setAddress(ev.target.value)}
                                className={'inputBox'}
                            />
                            <label className="errorLabel">{addressError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Select Primary Role"}</label>
                            <select
                                className={'dropDownStyle'}
                                onChange={(ev) => handlePrimaryRole(ev.target.value)}
                            >
                                {roleArray.map((item, index) => {
                                    return <option key={index+"dsds"} value={item.value}>{item.key}</option>
                                })}
                            </select>
                            <label className="errorLabel">{primaryRoleError}</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Select Secondary Role"}</label>
                            <select
                                className={'dropDownStyle'}
                                onChange={(ev) => setSecondaryRole(ev.target.value)}
                            >
                                {secondaryRoleArray.map((item, index) => {
                                    return <option key={index+ "sasad"} value={item.value}>{item.key}</option>
                                })}
                            </select>
                            <label className="errorLabel">{secondaryRoleError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Other Role"}</label>
                            <input
                                value={otherRole}
                                placeholder="Enter other role here"
                                onChange={(ev) => setOtherRole(ev.target.value)}
                                className={'inputBox'}
                            />
                            <label className="errorLabel">{ }</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Upload Photo"}</label>
                            <div className={'box-file'}>
                                {photo && <img src={URL.createObjectURL(photo)} className="img-display-before" />}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    placeholder="Enter other role here"
                                    onChange={(event) => {
                                        handlePhoto(event.target.files[0]);
                                    }}
                                />
                            </div>
                            <label className="errorLabel">{photoError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Upload Birth Certificate"}</label>
                            <div className={'box-file'}>
                                {birthCertificate && <img src={URL.createObjectURL(birthCertificate)} className="img-display-before" />}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={(event) => {
                                        handleirthCertificate(event.target.files[0]);
                                    }}
                                />
                            </div>
                            <label className="errorLabel">{birthCertificateError}</label>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={'inputContainer'}>
                            <label className={'lableStyle'}>{"Upload Aadhar Card"}</label>
                            <div className={'box-file'}>
                                {aadhar && <img src={URL.createObjectURL(aadhar)} className="img-display-before" />}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png"
                                    onChange={(event) => {
                                        handleAadhar(event.target.files[0]);
                                    }}
                                />
                            </div>
                            <label className="errorLabel">{aadharError}</label>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ marginTop: "40px" }}>
                            <label className={'lableStyle'}>{""}</label>
                            <div style={{ display: "flex" }}>
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        setCheckBox(false);
                                    }}
                                />
                                <Tooltip
                                    title={<ToolTipText />}
                                    arrow
                                    placement="top"
                                    style={{ cursor: "pointer", fontSize: "14px" }}
                                ><a href="">{"Terms & Condition:"} </a>
                                </Tooltip>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <br />
                <div style={{ textAlign: "center" }}>
                    <input disabled={checkBox} className={'inputButton'} type="button" onClick={handleFormSubmit} value={'Register'} />
                </div>
                {registrationSuccess && <SuccessDialog successButton={successButton} HeaderText={"Success"} BodyText={"Condidate Registration completed"} />}
                {registrationError && <SuccessDialog successButton={errorButton} HeaderText={"Error"} BodyText={errorMessage} />}
            </div>
            <Footer />
        </div>
    )
}

export default CreateCondidate