import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const texts = {
  en: {
    title: 'E-Journal',
    subtitle: 'Your digital classroom hub for study, teaching, and academic teamwork.',
    welcome: 'Welcome',
    intro: 'This page is the launchpad for your learning journey. Here you can quickly navigate to courses, journals, overviews, and manage the academic process.',
    roleTeacher: 'Teacher',
    roleStudent: 'Student',
    coursesCard: 'Courses',
    coursesCardText: 'Browse public courses, copy IDs, and join classes.',
    overviewCard: 'Overview',
    overviewCardText: 'Track progress, grades, and schedule in one place.',
    journalCard: 'Journal',
    journalCardText: 'Keep notes, tasks, and study records under control.',
    featuresTitle: 'Main features:',
    features: ['Course and group management', 'Assignment creation and review', 'Access to your personal study journal', 'Save and copy Course IDs'],
    wish: 'Wishing everyone great studies and inspiring work!',
    closing: 'May every lesson and assignment bring you closer to your next goal.',
    languageLabel: 'Language'
  },
  hy: {
    title: 'E-Journal',
    subtitle: 'Ձեր թվային ուսումնական կենտրոնը ուսման, ուսուցման և ակադեմիական թիմի համար։',
    welcome: 'Բարի գալուստ',
    intro: 'Այս էջն ձեր ուսման ճանապարհի մեկնարկն է։ Այստեղ կարող եք արագ բացել դասընթացները, օրվա գրքերը, տեսություններիները և կառավարել ակադեմիական գործընթացը։',
    roleTeacher: 'Ընդունիչ',
    roleStudent: 'Ուսանող',
    coursesCard: 'Դասընթացներ',
    coursesCardText: 'Դիտեք հանրային դասընթացները, պատճենեք ID-ները և միացեք դասերին։',
    overviewCard: 'Ամբողջական',
    overviewCardText: 'Հետևեք առաջընթացին, գնահատականներին և ժամանակացույցին մեկ վայրում։',
    journalCard: 'Օրագիր',
    journalCardText: 'Պահեք նշումներ, առաջադրանքներ և ուսումնառության դեպքեր։',
    featuresTitle: 'Հիմնական ֆունկցիաները՝',
    features: ['Դասընթացների և խմբերի կառավարում', 'Առաջադրանքների ստեղծում և ստուգում', 'Անձնական ուսումնառական օրագրի հասանելիություն', 'Պահպանել և պատճենել Course ID-ները'],
    wish: 'Ցանկանում ենք բոլորին հրաշալի ուսում և ոգեշնչող աշխատանք։',
    closing: 'Թող յուրաքանչյուր դասընթաց և առաջադրանք ձեզ մոտեցնի նոր նպատակին։',
    languageLabel: 'Լեզու'
  }
}

export default function MainPage() {
  const { currentUser } = useAuth()
  const [language, setLanguage] = useState('en')
  const locale = texts[language]
  const userRole = currentUser?.roles?.[0]?.toString().toLowerCase()
  const roleLabel = currentUser
    ? userRole === 'teacher'
      ? locale.roleTeacher
      : userRole === 'student'
      ? locale.roleStudent
      : 'Member'
    : ''

  return (
    <div className="panel main-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h2 className="main-title">{locale.title}</h2>
          <p className="main-subtitle">{locale.subtitle}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>{locale.languageLabel}</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.3)', background: '#0f172a', color: '#e2e8f0' }}
          >
            <option value="en">English</option>
            <option value="hy">Հայերեն</option>
          </select>
        </div>
      </div>

      <div className="info-box">
        <p>{locale.welcome}{currentUser ? `, ${currentUser.userName}` : ''}!</p>
        <p>{locale.intro}</p>
        {currentUser && (
          <p>
            {language === 'hy' ? 'Դուք սկսում եք որպես' : 'You are signed in as'} <strong>{roleLabel}</strong>.
          </p>
        )}
      </div>

      <div className="grid-tiles">
        <div className="tile">
          {locale.coursesCard}
          <div style={{ fontSize: '0.9rem', marginTop: '8px', fontWeight: 400 }}>
            {locale.coursesCardText}
          </div>
        </div>
        <div className="tile">
          {locale.overviewCard}
          <div style={{ fontSize: '0.9rem', marginTop: '8px', fontWeight: 400 }}>
            {locale.overviewCardText}
          </div>
        </div>
        <div className="tile">
          {locale.journalCard}
          <div style={{ fontSize: '0.9rem', marginTop: '8px', fontWeight: 400 }}>
            {locale.journalCardText}
          </div>
        </div>
      </div>

      <div className="info-box">
        <p>{locale.featuresTitle}</p>
        <ul style={{ textAlign: 'left', margin: '12px 0 0 18px', padding: 0, listStyleType: 'disc' }}>
          {locale.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="info-box">
        <p>{locale.wish}</p>
        <p>{locale.closing}</p>
      </div>
    </div>
  )
}
