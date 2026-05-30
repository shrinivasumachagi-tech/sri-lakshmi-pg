'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  CloudUpload,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { admissionSchema, type AdmissionFormData } from '@/lib/validations';

const stepsFields: (keyof AdmissionFormData)[][] = [
  ['fullName', 'phone', 'whatsapp', 'email', 'dob'],
  ['parentName', 'parentPhone', 'address', 'collegeName', 'courseName', 'roomType', 'stayDuration'],
  ['idProof', 'photo', 'terms'],
];

export default function AdmissionForm() {
  const t = useTranslations('Admission');
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [admissionId, setAdmissionId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { roomType: '2-Sharing', stayDuration: '' },
  });

  const idProofFile = watch('idProof');
  const photoFile = watch('photo');

  const nextStep = async () => {
    setSubmitError('');
    const fields = stepsFields[step];
    const valid = await trigger(fields);
    if (!valid) {
      const errs = Object.entries(errors)
        .filter(([k]) => fields.includes(k as keyof AdmissionFormData))
        .map(([, v]) => v?.message as string)
        .filter(Boolean);
      setStepErrors(errs);
      return;
    }
    setStepErrors([]);
    setStep((p) => Math.min(p + 1, 2));
  };

  const prevStep = () => {
    setSubmitError('');
    setStepErrors([]);
    setStep((p) => Math.max(p - 1, 0));
  };

  const uploadFile = async (field: string, file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `${field}_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from('documents')
      .upload(`admissions/${path}`, file, { cacheControl: '3600', upsert: false });
    if (error) {
      console.error(`[Upload] ${field} failed:`, error.message);
      return null;
    }
    const { data } = supabase.storage.from('documents').getPublicUrl(`admissions/${path}`);
    return data?.publicUrl || null;
  };

  const onSubmit = async (data: AdmissionFormData) => {
    setSubmitting(true);
    setSubmitError('');
    try {
      let idProofUrl: string | null = null;
      let photoUrl: string | null = null;

      if (data.idProof instanceof File) {
        idProofUrl = await uploadFile('id_proof', data.idProof);
      }
      if (data.photo instanceof File) {
        photoUrl = await uploadFile('photo', data.photo);
      }

      const payload = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        dob: data.dob,
        parent_name: data.parentName,
        parent_phone: data.parentPhone,
        address: data.address,
        college_name: data.collegeName,
        course_name: data.courseName,
        room_type: data.roomType,
        stay_duration: data.stayDuration,
        id_proof_url: idProofUrl,
        photo_url: photoUrl,
      };

      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Submission failed');

      setAdmissionId(result.id);
      setSuccess(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const percent = ((step + 1) / 3) * 100;
  const stepTitles = [t('step1Title'), t('step2Title'), t('step3Title')];

  const inputCls =
    'w-full h-11 bg-white border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-lg px-3.5 text-sm transition-all outline-none placeholder:text-gray-400';
  const labelCls = 'text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block';
  const errorCls = 'text-red-500 text-xs mt-1';
  const selectCls =
    'w-full h-11 bg-white border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-lg px-3.5 text-sm transition-all outline-none appearance-none';

  if (success) {
    return (
      <section id="admission" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('successTitle')}</h2>
            {admissionId && (
              <p className="text-pink-600 font-mono font-bold text-base mb-2">ID: {admissionId}</p>
            )}
            <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">{t('successDesc')}</p>
            <button
              onClick={() => {
                setSuccess(false);
                setStep(0);
                setAdmissionId('');
              }}
              className="px-6 py-2.5 bg-gray-100 rounded-lg font-semibold text-gray-700 text-sm hover:bg-gray-200 transition-colors"
            >
              {t('submitAnother')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admission" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">{t('title')}</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">{t('subtitle')}</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
              {t('step')} {step + 1} {t('of')} 3: {stepTitles[step]}
            </span>
            <span className="text-xs text-gray-400 font-medium">{Math.round(percent)}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-pink-600 rounded-full"
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Error banner */}
        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium">{submitError}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form
            className="p-6 md:p-8"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                {/* STEP 1: Personal */}
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{t('step1Title')}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{t('step1Desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>{t('fullName')} *</label>
                        <input {...register('fullName')} className={inputCls} placeholder={t('fullNamePlaceholder')} />
                        {errors.fullName && <p className={errorCls}>{String(errors.fullName.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('dob')} *</label>
                        <input type="date" {...register('dob')} className={inputCls} />
                        {errors.dob && <p className={errorCls}>{String(errors.dob.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('phone')} *</label>
                        <input {...register('phone')} className={inputCls} placeholder={t('phonePlaceholder')} maxLength={10} />
                        {errors.phone && <p className={errorCls}>{String(errors.phone.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('whatsapp')} *</label>
                        <input {...register('whatsapp')} className={inputCls} placeholder={t('whatsappPlaceholder')} maxLength={10} />
                        {errors.whatsapp && <p className={errorCls}>{String(errors.whatsapp.message)}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelCls}>{t('email')} *</label>
                        <input type="email" {...register('email')} className={inputCls} placeholder={t('emailPlaceholder')} />
                        {errors.email && <p className={errorCls}>{String(errors.email.message)}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Guardian & Academic */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{t('step2Title')}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{t('step2Desc')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>{t('parentName')} *</label>
                        <input {...register('parentName')} className={inputCls} placeholder={t('parentNamePlaceholder')} />
                        {errors.parentName && <p className={errorCls}>{String(errors.parentName.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('parentPhone')} *</label>
                        <input {...register('parentPhone')} className={inputCls} placeholder={t('parentPhonePlaceholder')} maxLength={10} />
                        {errors.parentPhone && <p className={errorCls}>{String(errors.parentPhone.message)}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelCls}>{t('address')} *</label>
                        <input {...register('address')} className={inputCls} placeholder={t('addressPlaceholder')} />
                        {errors.address && <p className={errorCls}>{String(errors.address.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('collegeName')} *</label>
                        <input {...register('collegeName')} className={inputCls} placeholder={t('collegeNamePlaceholder')} />
                        {errors.collegeName && <p className={errorCls}>{String(errors.collegeName.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('courseName')} *</label>
                        <input {...register('courseName')} className={inputCls} placeholder={t('courseNamePlaceholder')} />
                        {errors.courseName && <p className={errorCls}>{String(errors.courseName.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('roomType')} *</label>
                        <select {...register('roomType')} className={selectCls}>
                          <option value="1-Sharing">{t('single')}</option>
                          <option value="2-Sharing">{t('double')}</option>
                          <option value="3-Sharing">{t('triple')}</option>
                        </select>
                        {errors.roomType && <p className={errorCls}>{String(errors.roomType.message)}</p>}
                      </div>
                      <div>
                        <label className={labelCls}>{t('stayDuration')} *</label>
                        <select {...register('stayDuration')} className={selectCls}>
                          <option value="">{t('stayDuration')}</option>
                          <option value="1 Month">{t('duration1m')}</option>
                          <option value="3 Months">{t('duration3m')}</option>
                          <option value="6 Months">{t('duration6m')}</option>
                          <option value="1 Year">{t('duration1y')}</option>
                        </select>
                        {errors.stayDuration && <p className={errorCls}>{String(errors.stayDuration.message)}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Documents & Submit */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{t('step3Title')}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{t('step3Desc')}</p>
                    </div>

                    {/* Two-column upload cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* ID Proof */}
                      <label className="border border-gray-200 rounded-xl p-4 hover:border-pink-400 hover:bg-pink-50/30 transition-all cursor-pointer block">
                        <input
                          type="file"
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0] || null;
                            setValue('idProof', file, { shouldValidate: true });
                          }}
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-pink-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {idProofFile instanceof File ? idProofFile.name : t('idProof')}
                            </p>
                            <p className="text-xs text-gray-400">
                              {idProofFile instanceof File ? 'Selected' : t('uploadHint')}
                            </p>
                          </div>
                        </div>
                      </label>
                      {errors.idProof && <p className={errorCls}>{String(errors.idProof.message)}</p>}

                      {/* Photo */}
                      <label className="border border-gray-200 rounded-xl p-4 hover:border-pink-400 hover:bg-pink-50/30 transition-all cursor-pointer block">
                        <input
                          type="file"
                          className="hidden"
                          accept=".png,.jpg,.jpeg"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0] || null;
                            setValue('photo', file, { shouldValidate: true });
                          }}
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CloudUpload className="w-5 h-5 text-pink-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {photoFile instanceof File ? photoFile.name : t('photo')}
                            </p>
                            <p className="text-xs text-gray-400">
                              {photoFile instanceof File ? 'Selected' : t('uploadHint')}
                            </p>
                          </div>
                        </div>
                      </label>
                      {errors.photo && <p className={errorCls}>{String(errors.photo.message)}</p>}
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <ShieldCheck className="text-pink-600 w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-500">{t('uploadSecurity')}</p>
                    </div>

                    {/* Review summary */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">{t('readyTitle')}</h4>
                      <p className="text-xs text-gray-500 mb-3">{t('readyDesc')}</p>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-gray-200/60">
                          <span className="text-gray-500">{t('roomType')}</span>
                          <span className="font-semibold text-gray-900">{watch('roomType')}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200/60">
                          <span className="text-gray-500">{t('stayDuration')}</span>
                          <span className="font-semibold text-gray-900">{watch('stayDuration')}</span>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('terms')}
                        className="mt-0.5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 h-4 w-4"
                      />
                      <span className="text-xs text-gray-600 leading-relaxed">{t('agree')}</span>
                    </label>
                    {errors.terms && <p className={errorCls}>{String(errors.terms.message)}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step errors */}
            {stepErrors.length > 0 && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                {stepErrors.map((e, i) => (
                  <p key={i} className="text-amber-700 text-xs">{e}</p>
                ))}
              </div>
            )}

            {/* Buttons inside form */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                className={`text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 ${
                  step === 0 ? 'invisible' : ''
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                {t('back')}
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-pink-700 transition-colors flex items-center gap-2"
                >
                  {t('next')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-pink-700 transition-colors disabled:opacity-60 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('processing')}
                    </>
                  ) : (
                    t('submit')
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
